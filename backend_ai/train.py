# train.py
"""Supervised training pipeline for DualCNN using parsed SGF game records."""
from __future__ import annotations
import os
import random
from typing import List, Tuple, Iterator

import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from torch.optim import Adam

from models.dual_network import DualCNN
from models.encoder import BoardEncoder
from utils.sgf_processor import SGFProcessor
from utils.game_logic import GoState, BOARD_SIZE, BLACK, WHITE

WEIGHTS_DIR = "weights"


class SGFDataset(Dataset):
    """Dataset yielding (board_tensor, policy_target, value_target) from SGF files."""

    def __init__(self, sgf_paths: List[str]):
        self.samples: List[Tuple] = []  # (state, move_index, value)
        self.encoder = BoardEncoder()
        self._build(sgf_paths)

    def _move_to_index(self, move) -> int:
        if move is None:
            return BOARD_SIZE * BOARD_SIZE  # pass index (optional 362-dim policy)
        r, c = move
        return r * BOARD_SIZE + c

    def _build(self, sgf_paths: List[str]) -> None:
        processor = SGFProcessor()
        for path in sgf_paths:
            try:
                moves = processor.parse_sgf_file(path)
            except Exception:
                continue

            state = GoState(size=BOARD_SIZE)
            # Dummy result assumption: Black wins => value target from mover's perspective
            winner = BLACK  # placeholder; replace with actual SGF result parsing

            for move in moves:
                encoded_board = self.encoder.encode(state)
                policy_idx = self._move_to_index(move)
                value_target = 1.0 if state.current_player == winner else -1.0

                self.samples.append((encoded_board, policy_idx, value_target))

                if not state.apply_move(move):
                    break  # illegal move in record, stop processing this game

    def __len__(self) -> int:
        return len(self.samples)

    def __getitem__(self, idx: int):
        board, policy_idx, value = self.samples[idx]
        board_t = torch.tensor(board, dtype=torch.float32)
        policy_t = torch.tensor(policy_idx, dtype=torch.long)
        value_t = torch.tensor([value], dtype=torch.float32)
        return board_t, policy_t, value_t


def get_dummy_sgf_paths(sgf_dir: str = "data/sgf") -> List[str]:
    """Collect .sgf file paths from a directory (dummy loader simulation)."""
    if not os.path.isdir(sgf_dir):
        return []
    return [os.path.join(sgf_dir, f) for f in os.listdir(sgf_dir) if f.endswith(".sgf")]


def train(
    epochs: int = 10,
    batch_size: int = 32,
    lr: float = 1e-3,
    sgf_dir: str = "data/sgf",
    device: str = "cuda" if torch.cuda.is_available() else "cpu",
) -> None:
    """Run supervised training loop for DualCNN and save checkpoints."""
    os.makedirs(WEIGHTS_DIR, exist_ok=True)

    sgf_paths = get_dummy_sgf_paths(sgf_dir)
    if not sgf_paths:
        print(f"No SGF files found in {sgf_dir}; using empty dummy dataset.")

    dataset = SGFDataset(sgf_paths)
    if len(dataset) == 0:
        print("Dataset is empty. Aborting training.")
        return

    loader = DataLoader(dataset, batch_size=batch_size, shuffle=True, drop_last=False)

    model = DualCNN().to(device)
    optimizer = Adam(model.parameters(), lr=lr)
    policy_loss_fn = nn.CrossEntropyLoss()
    value_loss_fn = nn.MSELoss()

    model.train()
    for epoch in range(1, epochs + 1):
        total_loss = 0.0
        for board_batch, policy_target, value_target in loader:
            board_batch = board_batch.to(device)
            policy_target = policy_target.to(device)
            value_target = value_target.to(device)

            optimizer.zero_grad()
            policy_pred, value_pred = model(board_batch)

            p_loss = policy_loss_fn(policy_pred, policy_target)
            v_loss = value_loss_fn(value_pred, value_target)
            loss = p_loss + v_loss

            loss.backward()
            optimizer.step()

            total_loss += loss.item()

        avg_loss = total_loss / max(len(loader), 1)
        print(f"[Epoch {epoch}/{epochs}] avg_loss={avg_loss:.4f}")

        checkpoint_path = os.path.join(WEIGHTS_DIR, f"dualcnn_epoch{epoch}.pth")
        torch.save(model.state_dict(), checkpoint_path)

    final_path = os.path.join(WEIGHTS_DIR, "dualcnn_final.pth")
    torch.save(model.state_dict(), final_path)
    print(f"Training complete. Final model saved to {final_path}")


if __name__ == "__main__":
    train()