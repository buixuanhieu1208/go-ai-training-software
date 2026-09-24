// src/components/RulesModal/RulesModal.tsx
// Bảng popup hướng dẫn luật chơi Cờ vây theo LUẬT TRUNG QUỐC (Area Scoring) —
// mở được từ Menu chính lẫn từ trong ván đấu (nút "?" trên header). Component
// thuần hiển thị, không chứa state/logic luật cờ.

import { useEffect } from "react";
import "./RulesModal.css";

export interface RulesModalProps {
  open: boolean;
  onClose: () => void;
}

export function RulesModal({ open, onClose }: RulesModalProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="rules-modal__backdrop" onClick={onClose}>
      <div
        className="rules-modal"
        role="dialog"
        aria-modal="true"
        aria-label="Hướng dẫn luật chơi Cờ vây"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="rules-modal__header">
          <h2>Luật chơi Cờ vây — Luật Trung Quốc</h2>
          <button className="rules-modal__close" onClick={onClose} aria-label="Đóng">
            ✕
          </button>
        </div>

        <div className="rules-modal__body">
          <section>
            <h3>1. Mục tiêu &amp; lượt đi</h3>
            <p>
              Hai người chơi lần lượt đặt quân Đen và Trắng lên các giao điểm của bàn cờ (9×9, 13×13
              hoặc 19×19). <strong>Đen luôn đi trước.</strong> Mục tiêu là kiểm soát nhiều lãnh thổ
              hơn đối phương khi ván đấu kết thúc.
            </p>
          </section>

          <section>
            <h3>2. Khí (Liberties) &amp; Bắt quân</h3>
            <p>
              Mỗi quân hoặc nhóm quân liên kết có các điểm trống liền kề gọi là <strong>khí</strong>.
              Khi một nhóm quân bị vây kín hoàn toàn, không còn khí nào, toàn bộ nhóm đó bị{" "}
              <strong>bắt</strong> và nhấc khỏi bàn cờ ngay lập tức.
            </p>
          </section>

          <section>
            <h3>3. Luật cấm tự sát (Suicide)</h3>
            <p>
              Không được đặt quân vào vị trí khiến nhóm quân của chính mình lập tức hết khí — trừ khi
              nước đi đó đồng thời bắt được quân đối phương (quân đối phương bị nhấc trước, nên nhóm
              của mình lại có khí trở lại).
            </p>
          </section>

          <section>
            <h3>4. Luật Kiếp (Ko)</h3>
            <p>
              Không được đi một nước khiến bàn cờ trở lại đúng trạng thái đã từng xuất hiện trước đó
              (Positional Superko), nhằm tránh việc bắt-đi-bắt-lại vô hạn tại cùng một điểm.
            </p>
          </section>

          <section>
            <h3>5. Bỏ lượt &amp; Kết thúc ván</h3>
            <p>
              Người chơi có thể <strong>bỏ lượt (Pass)</strong> bất cứ lúc nào thay vì đặt quân. Khi
              cả hai bên bỏ lượt liên tiếp, ván đấu kết thúc và chuyển sang giai đoạn tính điểm.
            </p>
          </section>

          <section>
            <h3>6. Tính điểm kiểu Trung Quốc (Area Scoring)</h3>
            <p>
              Khác với luật Nhật Bản (chỉ đếm lãnh thổ trống), luật Trung Quốc tính điểm theo{" "}
              <strong>diện tích kiểm soát</strong>:
            </p>
            <p className="rules-modal__formula">
              Điểm = Số quân còn trên bàn&nbsp;+&nbsp;Số điểm lãnh thổ (vùng trống chỉ giáp đúng 1
              màu duy nhất)
            </p>
            <p>
              Vì quân cờ được tính điểm ngang với đất trống, việc đóng thêm quân vào lãnh thổ của
              chính mình gần cuối ván (dame) không làm giảm điểm — khác biệt lớn nhất so với luật
              Nhật Bản.
            </p>
          </section>

          <section>
            <h3>7. Komi (Điểm đền cho Trắng)</h3>
            <p>
              Vì đi trước có lợi thế, Trắng được cộng thêm một số điểm cố định gọi là{" "}
              <strong>Komi</strong> khi tính điểm cuối ván — thường là{" "}
              <strong>7.5 điểm</strong> theo luật Trung Quốc hiện đại — để cân bằng lợi thế tiên thủ.
            </p>
          </section>

          <section>
            <h3>8. So sánh nhanh với luật Nhật Bản</h3>
            <ul>
              <li>
                <strong>Nhật Bản (Territory Scoring):</strong> chỉ tính điểm lãnh thổ trống + số quân
                đối phương bị bắt trong ván.
              </li>
              <li>
                <strong>Trung Quốc (Area Scoring):</strong> tính quân trên bàn + lãnh thổ trống. Kết
                quả cuối cùng ở đa số ván là tương đương nhau, chỉ khác cách đếm và cách xử lý nước
                dame.
              </li>
            </ul>
          </section>
        </div>

        <div className="rules-modal__footer">
          <button className="btn btn--secondary" onClick={onClose}>
            Đã hiểu, bắt đầu chơi
          </button>
        </div>
      </div>
    </div>
  );
}
