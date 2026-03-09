import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(selectedUser._id);

  return (
    <div className="px-4 py-3 border-b border-base-content/5 bg-base-100/50 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img
              src={selectedUser.profilePicture || "/avatar.png"}
              alt={selectedUser.fullName}
              className="size-10 rounded-full object-cover ring-2 ring-base-content/5"
            />
            {isOnline && (
              <span className="absolute bottom-0 right-0 size-2.5 bg-emerald-500 rounded-full ring-2 ring-base-100 pulse-ring" />
            )}
          </div>

          {/* User info */}
          <div>
            <h3 className="font-semibold text-sm">{selectedUser.fullName}</h3>
            <p className={`text-xs ${isOnline ? "text-emerald-400" : "text-base-content/40"}`}>
              {isOnline ? "Active now" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={() => setSelectedUser(null)}
          className="btn btn-ghost btn-sm btn-circle text-base-content/40 hover:text-base-content hover:bg-base-content/5 transition-colors"
        >
          <X className="size-5" />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
