import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-base-200/30">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => {
          const isSent = message.senderId === authUser._id;
          return (
            <div
              key={message._id}
              className={`flex items-end gap-2 ${isSent ? "justify-end" : "justify-start"}`}
              ref={messageEndRef}
            >
              {/* Avatar for received messages */}
              {!isSent && (
                <img
                  src={selectedUser.profilePicture || "/avatar.png"}
                  alt=""
                  className="size-7 rounded-full object-cover ring-1 ring-base-content/5 mb-5 flex-shrink-0"
                />
              )}

              <div className={`flex flex-col ${isSent ? "items-end" : "items-start"} max-w-[70%]`}>
                <div
                  className={`
                    px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                    ${isSent
                      ? "msg-sent rounded-br-md"
                      : "msg-received rounded-bl-md"
                    }
                  `}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="max-w-[220px] rounded-xl mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>
                <time className="text-[10px] text-base-content/30 mt-1 px-1">
                  {formatMessageTime(message.createdAt)}
                </time>
              </div>

              {/* Avatar for sent messages */}
              {isSent && (
                <img
                  src={authUser.profilePicture || "/avatar.png"}
                  alt=""
                  className="size-7 rounded-full object-cover ring-1 ring-base-content/5 mb-5 flex-shrink-0"
                />
              )}
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
