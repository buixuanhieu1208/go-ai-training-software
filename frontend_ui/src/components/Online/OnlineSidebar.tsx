// src/components/Online/OnlineSidebar.tsx
import type { Move } from "../../types/go";
import { PlayTab } from "./tabs/PlayTab";
import { FriendsTab } from "./tabs/FriendsTab";
import { AnalysisTab } from "./tabs/AnalysisTab";
import "./OnlineSidebar.css";

export type SidebarTab = "play" | "friends" | "analysis";

interface OnlineSidebarProps {
  activeTab: SidebarTab;
  onChangeTab: (tab: SidebarTab) => void;
  onEnterMatch: (matchId: string) => void;
  activeMoveHistory: Move[];
  boardSize: number;
}

const TABS: { id: SidebarTab; label: string; svg: string }[] = [
  {
    id: "play",
    label: "Chơi",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,
  },
  {
    id: "friends",
    label: "Bạn bè",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  },
  {
    id: "analysis",
    label: "Nước đi",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  },
];

export function OnlineSidebar({ activeTab, onChangeTab, onEnterMatch, activeMoveHistory, boardSize }: OnlineSidebarProps) {
  return (
    <div className="online-sidebar">
      <div className="online-sidebar__tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`online-sidebar__tab ${activeTab === tab.id ? 'online-sidebar__tab--active' : ''}`}
            onClick={() => onChangeTab(tab.id)}
            type="button"
          >
            <span className="online-sidebar__tab-icon" dangerouslySetInnerHTML={{ __html: tab.svg }} />
            {tab.label}
          </button>
        ))}
      </div>
      <div className="online-sidebar__content">
        {activeTab === "play" && <PlayTab onEnterMatch={onEnterMatch} />}
        {activeTab === "friends" && <FriendsTab />}
        {activeTab === "analysis" && <AnalysisTab moveHistory={activeMoveHistory} boardSize={boardSize} />}
      </div>
    </div>
  );
}