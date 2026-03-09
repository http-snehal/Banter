import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Search } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = users
    .filter((user) => (!showOnlineOnly || onlineUsers.includes(user._id)))
    .filter((user) =>
      user.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 lg:w-80 border-r border-base-content/5 flex flex-col transition-all duration-200 bg-base-100/50">
      {/* Header */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center">
            <Users className="size-4 text-indigo-400" />
          </div>
          <span className="font-semibold hidden lg:block text-sm">Contacts</span>
          <span className="text-xs text-base-content/30 hidden lg:block ml-auto">
            {onlineUsers.length - 1} online
          </span>
        </div>

        {/* Search */}
        <div className="hidden lg:block relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-base-content/30" />
          <input
            type="text"
            placeholder="Search contacts..."
            className="input input-sm w-full pl-9 bg-base-200/50 border-base-content/5 rounded-xl text-sm h-9 focus:border-indigo-500/30 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Online filter */}
        <div className="hidden lg:flex items-center gap-2">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="toggle toggle-xs toggle-primary"
            />
            <span className="text-xs text-base-content/50">Online only</span>
          </label>
        </div>
      </div>

      <div className="divider my-0 h-[1px] bg-base-content/5" />

      {/* User List */}
      <div className="overflow-y-auto flex-1 py-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full px-4 py-3 flex items-center gap-3
              hover:bg-base-content/5 transition-all duration-200
              ${selectedUser?._id === user._id
                ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/5 border-l-2 border-indigo-500"
                : "border-l-2 border-transparent"
              }
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0 flex-shrink-0">
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.fullName}
                className="size-11 object-cover rounded-full ring-2 ring-base-content/5"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full ring-2 ring-base-100 pulse-ring" />
              )}
            </div>

            {/* User info */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium text-sm truncate">{user.fullName}</div>
              <div className={`text-xs ${onlineUsers.includes(user._id) ? "text-emerald-400" : "text-base-content/30"}`}>
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-base-content/30 py-8 text-sm">
            {searchQuery ? "No matching contacts" : "No online users"}
          </div>
        )}
      </div>
    </aside>
  );
};
export default Sidebar;
