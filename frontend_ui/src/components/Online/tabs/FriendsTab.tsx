// src/components/Online/tabs/FriendsTab.tsx
import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import {
  searchUsers,
  sendFriendRequest,
  listenIncomingFriendRequests,
  acceptFriendRequest,
  declineFriendRequest,
  listenFriendsProfiles,
  sendMatchInvite,
} from "../../../services/firestoreService";
import type { UserProfile, FriendRequest } from "../../../types/user";
import "./FriendsTab.css";

export function FriendsTab() {
  const { user, profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserProfile[]>([]);
  const [searching, setSearching] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [incomingRequests, setIncomingRequests] = useState<FriendRequest[]>([]);
  const [friends, setFriends] = useState<UserProfile[]>([]);
  const [actionMsg, setActionMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    return listenIncomingFriendRequests(user.uid, (reqs) => setIncomingRequests(reqs as FriendRequest[]));
  }, [user]);

  useEffect(() => {
    if (!profile) return;
    return listenFriendsProfiles(profile.friendsList, (list) => setFriends(list as UserProfile[]));
  }, [profile]);

  const handleCopyInviteLink = () => {
    if (!user) return;
    navigator.clipboard.writeText(`${window.location.origin}/add-friend/${user.uid}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleSearch = async () => {
    if (!searchQuery.trim() || !user) return;
    setSearching(true);
    try {
      setSearchResults(await searchUsers(searchQuery, user.uid));
    } finally {
      setSearching(false);
    }
  };

  const handleAddFriend = async (targetUid: string) => {
    if (!profile) return;
    setActionMsg(null);
    try {
      await sendFriendRequest(profile, targetUid);
      setActionMsg("Đã gửi lời mời kết bạn!");
    } catch (err: any) {
      setActionMsg(err.message);
    }
  };

  const handleChallenge = async (targetUid: string) => {
    if (!profile) return;
    try {
      await sendMatchInvite(profile, targetUid, 19);
      setActionMsg("Đã gửi thư thách đấu!");
    } catch (err: any) {
      setActionMsg(err.message);
    }
  };

  return (
    <div className="friends-tab">
      <button className="friends-tab__invite-btn" onClick={handleCopyInviteLink} type="button">
        🔗 {linkCopied ? "Đã copy link!" : "Sao chép link kết bạn"}
      </button>

      <div className="friends-tab__search">
        <input
          className="friends-tab__search-input"
          placeholder="Tìm theo Username hoặc Email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button className="friends-tab__search-btn" onClick={handleSearch} disabled={searching} type="button">
          {searching ? "..." : "Tìm"}
        </button>
      </div>

      {actionMsg && <div className="friends-tab__msg">{actionMsg}</div>}

      {searchResults.length > 0 && (
        <div className="friends-tab__section">
          <div className="friends-tab__section-title">Kết quả tìm kiếm</div>
          {searchResults.map((p) => (
            <div key={p.uid} className="friends-tab__row">
              <FriendInfo profile={p} />
              <button className="friends-tab__challenge-btn" onClick={() => handleAddFriend(p.uid)} type="button">
                + Kết bạn
              </button>
            </div>
          ))}
        </div>
      )}

      {incomingRequests.length > 0 && (
        <div className="friends-tab__section">
          <div className="friends-tab__section-title">Lời mời kết bạn ({incomingRequests.length})</div>
          {incomingRequests.map((req) => (
            <div key={req.id} className="friends-tab__row">
              <div className="friends-tab__username">{req.fromUsername}</div>
              <div style={{ display: "flex", gap: 6 }}>
                <button className="friends-tab__challenge-btn" onClick={() => acceptFriendRequest(req)} type="button">
                  Đồng ý
                </button>
                <button className="friends-tab__decline-btn" onClick={() => declineFriendRequest(req.id)} type="button">
                  Từ chối
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="friends-tab__section">
        <div className="friends-tab__section-title">Bạn bè ({friends.length})</div>
        {friends.length === 0 ? (
          <p className="friends-tab__empty">Chưa có bạn bè nào. Hãy tìm hoặc chia sẻ link kết bạn!</p>
        ) : (
          friends.map((p) => (
            <div key={p.uid} className="friends-tab__row">
              <FriendInfo profile={p} />
              <button className="friends-tab__challenge-btn" onClick={() => handleChallenge(p.uid)} type="button">
                Thách đấu
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function FriendInfo({ profile }: { profile: UserProfile }) {
  return (
    <div className="friends-tab__row-info">
      {profile.photoURL ? (
        <img src={profile.photoURL} alt="" className="friends-tab__avatar" />
      ) : (
        <div className="friends-tab__avatar friends-tab__avatar--fallback">{profile.username[0]}</div>
      )}
      <div>
        <div className="friends-tab__username">{profile.username}</div>
        <div className="friends-tab__elo">ELO {profile.elo}</div>
      </div>
    </div>
  );
}