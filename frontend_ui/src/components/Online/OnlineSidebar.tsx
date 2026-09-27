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
}

const TABS: { id: SidebarTab; label: string; icon: string }[] = [
  { id: "play", label: "Chơi trực tuyến", icon: "⚔️" },
  { id: "friends", label: "Bạn bè", icon: "👥" },
  { id: "analysis", label: "Phân tích", icon: "📊" },
];

export function OnlineSidebar({ activeTab, onChangeTab, onEnterMatch, activeMoveHistory }: OnlineSidebarProps) {
  return (
    <div className="online-sidebar">
      <div className="online-sidebar__tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`online-sidebar__tab ${activeTab === tab.id ? "online-sidebar__tab--active" : ""}`}
            onClick={() => onChangeTab(tab.id)}
            type="button"
          >
            <span className="online-sidebar__tab-icon">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="online-sidebar__content">
        {activeTab === "play" && <PlayTab onEnterMatch={onEnterMatch} />}
        {activeTab === "friends" && <FriendsTab />}
        {activeTab === "analysis" && <AnalysisTab moveHistory={activeMoveHistory} />}
      </div>
    </div>
  );
}