import random
import copy
from typing import List, Tuple, Optional, Dict, Any

Move = Tuple[int, int]


class GoState:
    """Minimal mock Go board state sufficient to exercise search logic."""

    def __init__(self, board_size: int = 9, board: Optional[List[List[int]]] = None,
                 current_player: int = 1, pass_count: int = 0, move_count: int = 0) -> None:
        self.board_size = board_size
        self.board = board if board is not None else [[0] * board_size for _ in range(board_size)]
        self.current_player = current_player
        self.pass_count = pass_count
        self.move_count = move_count

    def get_legal_moves(self) -> List[Move]:
        """Returns empty intersections as legal moves; 'pass' handled separately by caller."""
        moves = []
        for y in range(self.board_size):
            for x in range(self.board_size):
                if self.board[y][x] == 0:
                    moves.append((x, y))
        return moves

    def apply_move(self, move: Optional[Move]) -> "GoState":
        """Returns a new GoState after applying move (None = pass)."""
        new_board = copy.deepcopy(self.board)
        pass_count = self.pass_count
        if move is None:
            pass_count += 1
        else:
            x, y = move
            new_board[y][x] = self.current_player
            pass_count = 0
        return GoState(
            board_size=self.board_size,
            board=new_board,
            current_player=-self.current_player,
            pass_count=pass_count,
            move_count=self.move_count + 1,
        )

    def is_terminal(self) -> bool:
        return self.pass_count >= 2 or len(self.get_legal_moves()) == 0


class GoAIEngine:
    """CNN-guided Minimax engine with Alpha-Beta pruning for Go move selection."""

    def __init__(self, seed: Optional[int] = None) -> None:
        self._rng = random.Random(seed)

    def predict(self, state: GoState) -> Tuple[List[Tuple[Move, float]], float]:
        """Mock CNN forward pass: returns (policy, value) without any real model."""
        legal_moves = state.get_legal_moves()
        if not legal_moves:
            return [], 0.0

        raw_scores = [self._rng.random() for _ in legal_moves]
        total = sum(raw_scores)
        probs = [s / total for s in raw_scores]
        policy = sorted(zip(legal_moves, probs), key=lambda item: item[1], reverse=True)

        value = self._rng.uniform(-1.0, 1.0)
        return policy, value

    def minimax(
        self,
        state: GoState,
        depth: int,
        alpha: float,
        beta: float,
        maximizing_player: bool,
        k_branches: int,
    ) -> float:
        """Alpha-Beta Minimax guided by mock policy (breadth) and value (depth cutoff)."""
        policy, value = self.predict(state)

        if depth == 0 or state.is_terminal() or not policy:
            return value

        top_moves = [move for move, _ in policy[:k_branches]]

        if maximizing_player:
            best_score = float("-inf")
            for move in top_moves:
                child_state = state.apply_move(move)
                score = self.minimax(child_state, depth - 1, alpha, beta, False, k_branches)
                best_score = max(best_score, score)
                alpha = max(alpha, best_score)
                if beta <= alpha:
                    break
            return best_score
        else:
            best_score = float("inf")
            for move in top_moves:
                child_state = state.apply_move(move)
                score = self.minimax(child_state, depth - 1, alpha, beta, True, k_branches)
                best_score = min(best_score, score)
                beta = min(beta, best_score)
                if beta <= alpha:
                    break
            return best_score

    def get_best_move(self, state: GoState, difficulty: str) -> Optional[Move]:
        """Selects a move according to difficulty: Easy (policy-only), Medium/Hard (Minimax)."""
        settings: Dict[str, Dict[str, int]] = {
            "Easy": {"depth": 1, "k": 5},
            "Medium": {"depth": 3, "k": 3},
            "Hard": {"depth": 5, "k": 5},
        }
        if difficulty not in settings:
            raise ValueError(f"Unknown difficulty: {difficulty}")

        depth = settings[difficulty]["depth"]
        k = settings[difficulty]["k"]

        policy, _ = self.predict(state)
        if not policy:
            return None

        top_moves = policy[:k]

        if difficulty == "Easy":
            move, _ = self._rng.choice(top_moves)
            return move

        best_move: Optional[Move] = None
        best_score = float("-inf")
        alpha, beta = float("-inf"), float("inf")

        for move, _ in top_moves:
            child_state = state.apply_move(move)
            score = self.minimax(child_state, depth - 1, alpha, beta, False, k)
            if score > best_score:
                best_score = score
                best_move = move
            alpha = max(alpha, best_score)

        return best_move