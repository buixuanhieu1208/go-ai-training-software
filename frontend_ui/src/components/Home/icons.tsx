// src/components/Home/icons.tsx
// Bộ icon SVG dùng chung cho Home + Sidebar — vẽ tay theo motif quân cờ/bàn cờ
// (không dùng emoji hay icon set ngoài) để giữ đồng bộ phong cách toàn app.

export function IconDuo() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="12" cy="16" r="8" className="mode-icon__fill mode-icon__fill--black" />
      <circle cx="20" cy="16" r="8" className="mode-icon__fill mode-icon__fill--white" />
    </svg>
  );
}

export function IconGlobe() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <circle cx="16" cy="16" r="10" className="mode-icon__stroke" />
      <ellipse cx="16" cy="16" rx="4" ry="10" className="mode-icon__stroke" />
      <line x1="6" y1="16" x2="26" y2="16" className="mode-icon__stroke" />
    </svg>
  );
}

export function IconAi() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect x="9" y="9" width="14" height="14" rx="3" className="mode-icon__stroke" />
      <circle cx="16" cy="16" r="3" className="mode-icon__fill mode-icon__fill--black" />
      <line x1="16" y1="4" x2="16" y2="9" className="mode-icon__stroke" />
      <line x1="16" y1="23" x2="16" y2="28" className="mode-icon__stroke" />
      <line x1="4" y1="16" x2="9" y2="16" className="mode-icon__stroke" />
      <line x1="23" y1="16" x2="28" y2="16" className="mode-icon__stroke" />
    </svg>
  );
}

export function IconDuel() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect x="4" y="10" width="10" height="10" rx="2.5" className="mode-icon__stroke" />
      <rect x="18" y="10" width="10" height="10" rx="2.5" className="mode-icon__stroke" />
      <line x1="14" y1="15" x2="18" y2="15" className="mode-icon__stroke" strokeDasharray="2 2" />
    </svg>
  );
}

export function IconPuzzle() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect x="5" y="5" width="22" height="22" className="mode-icon__stroke" />
      <line x1="5" y1="12.3" x2="27" y2="12.3" className="mode-icon__stroke" />
      <line x1="5" y1="19.6" x2="27" y2="19.6" className="mode-icon__stroke" />
      <line x1="12.3" y1="5" x2="12.3" y2="27" className="mode-icon__stroke" />
      <line x1="19.6" y1="5" x2="19.6" y2="27" className="mode-icon__stroke" />
      <circle cx="19.6" cy="12.3" r="3" className="mode-icon__fill mode-icon__fill--black" />
    </svg>
  );
}

export function IconStar() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <path
        d="M16 4 L19.5 13 L29 13.5 L21.5 19.5 L24 29 L16 23.5 L8 29 L10.5 19.5 L3 13.5 L12.5 13 Z"
        className="mode-icon__stroke"
      />
    </svg>
  );
}

export function IconGrid() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <rect x="5" y="5" width="22" height="22" rx="2" className="mode-icon__stroke" />
      <line x1="5" y1="16" x2="27" y2="16" className="mode-icon__stroke" />
      <line x1="16" y1="5" x2="16" y2="27" className="mode-icon__stroke" />
    </svg>
  );
}

export function IconSpark() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <path d="M16 3 L16 14 M16 18 L16 29 M3 16 L10 16 M22 16 L29 16" className="mode-icon__stroke" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4" className="mode-icon__fill mode-icon__fill--black" />
    </svg>
  );
}

export function IconScale() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <line x1="16" y1="5" x2="16" y2="26" className="mode-icon__stroke" />
      <line x1="7" y1="9" x2="25" y2="9" className="mode-icon__stroke" />
      <path d="M7 9 L4 17 A4.5 4.5 0 0 0 10 17 Z" className="mode-icon__stroke" />
      <path d="M25 9 L22 17 A4.5 4.5 0 0 0 28 17 Z" className="mode-icon__stroke" />
      <line x1="11" y1="27" x2="21" y2="27" className="mode-icon__stroke" />
    </svg>
  );
}

export function IconBook() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <path d="M16 8 C13 6 8 6 5 7 V25 C8 24 13 24 16 26 Z" className="mode-icon__stroke" />
      <path d="M16 8 C19 6 24 6 27 7 V25 C24 24 19 24 16 26 Z" className="mode-icon__stroke" />
    </svg>
  );
}

export function IconEye() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <path d="M3 16 C8 8 24 8 29 16 C24 24 8 24 3 16 Z" className="mode-icon__stroke" />
      <circle cx="16" cy="16" r="4" className="mode-icon__fill mode-icon__fill--black" />
    </svg>
  );
}

export function IconPeople() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22" fill="none">
      <circle cx="12" cy="11" r="4.5" className="mode-icon__stroke" />
      <circle cx="21" cy="13" r="3.5" className="mode-icon__stroke" />
      <path d="M4 27 C4 20 8.5 17 12 17 C15.5 17 20 20 20 27" className="mode-icon__stroke" />
      <path d="M20 27 C20 22.5 22 20 23.5 19" className="mode-icon__stroke" />
    </svg>
  );
}

export function IconDots() {
  return (
    <svg viewBox="0 0 32 32" width="22" height="22">
      <circle cx="8" cy="16" r="2.4" className="mode-icon__fill mode-icon__fill--black" />
      <circle cx="16" cy="16" r="2.4" className="mode-icon__fill mode-icon__fill--black" />
      <circle cx="24" cy="16" r="2.4" className="mode-icon__fill mode-icon__fill--black" />
    </svg>
  );
}

export function IconSearch() {
  return (
    <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
      <circle cx="14" cy="14" r="8" className="mode-icon__stroke" />
      <line x1="20" y1="20" x2="27" y2="27" className="mode-icon__stroke" strokeLinecap="round" />
    </svg>
  );
}

export function IconHelp() {
  return (
    <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
      <circle cx="16" cy="16" r="12" className="mode-icon__stroke" />
      <path d="M12 13 C12 10 20 10 20 13 C20 16 16 15.5 16 19" className="mode-icon__stroke" strokeLinecap="round" />
      <circle cx="16" cy="23.5" r="1.4" className="mode-icon__fill mode-icon__fill--black" />
    </svg>
  );
}

export function IconLanguage() {
  return (
    <svg viewBox="0 0 32 32" width="18" height="18" fill="none">
      <circle cx="16" cy="16" r="12" className="mode-icon__stroke" />
      <ellipse cx="16" cy="16" rx="5" ry="12" className="mode-icon__stroke" />
      <line x1="4" y1="16" x2="28" y2="16" className="mode-icon__stroke" />
    </svg>
  );
}
