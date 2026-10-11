// src/components/Online/OnlinePlayerBar.tsx
import "./OnlinePlayerBar.css";

interface OnlinePlayerBarProps {
  color: "black" | "white";
  displayName: string;
  photoURL?: string | null;
  elo?: number;
  capturedCount: number;
  isActive: boolean;
  isMe?: boolean;
}

export function OnlinePlayerBar({ color, displayName, photoURL, elo, capturedCount, isActive, isMe }: OnlinePlayerBarProps) {
  const initials = displayName.slice(0, 2).toUpperCase();
  return (
    <div className={`online-player-bar ${isActive ? 'online-player-bar--active' : ''} ${isMe ? 'online-player-bar--me' : ''}`}>
      <div className="opb-avatar">
        {photoURL ? (
          <img src={photoURL} alt={displayName} />
        ) : (
          <span className="opb-avatar__initials">{initials}</span>
        )}
        <span className={`opb-avatar__stone opb-avatar__stone--${color}`} />
      </div>
      <div className="opb-info">
        <span className="opb-info__name">{displayName}</span>
        {elo !== undefined && <span className="opb-info__elo">{elo}</span>}
      </div>
      <div className="opb-captures">
        <span className="opb-captures__stones">
          {Array.from({ length: Math.min(capturedCount, 10) }).map((_, i) => (
            <span key={i} className={`opb-captures__dot opb-captures__dot--${color === 'black' ? 'white' : 'black'}`} />
          ))}
          {capturedCount > 10 && <span className="opb-captures__overflow">+{capturedCount - 10}</span>}
        </span>
        <span className="opb-captures__label">{capturedCount} bắt được</span>
      </div>
      {isActive && <div className="opb-turn-indicator"><span />Đang đi</div>}
    </div>
  );
}
