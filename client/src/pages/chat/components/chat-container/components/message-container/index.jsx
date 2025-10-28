import { useEffect, useRef, useMemo } from "react";
// --- FIX: Changed alias paths to relative paths ---
import { useAppStore } from "@/store";
import { apiClient } from "@/lib/api-client";
import { socket } from "@/socket-client";
import { GET_MESSAGES, RECEIVE_MESSAGE_SOCKET_EVENT } from "@/utils/constants";

function MessageContainer() {
  const {
    selectedChatData,
    selectedChatMessages = {},
    addMessageToChat,
    setSelectedChatMessages,
    userInfo,
  } = useAppStore();

  const containerRef = useRef();

  // --- FIX: Generate ONE consistent chatId and use it everywhere ---
  const chatId = useMemo(() => {
    if (!userInfo?.id || !selectedChatData?._id) return null;
    const userIds = [userInfo.id, selectedChatData._id].sort();
    return userIds.join("-");
  }, [userInfo?.id, selectedChatData?._id]);

  // --- 1. USE THE KEY: Fetching messages ---
  useEffect(() => {
    const fetchMessages = async () => {
      // Now we only need to check if the consistent chatId exists
      if (chatId && !selectedChatMessages[chatId]) {
        try {
          const response = await apiClient.get(`${GET_MESSAGES}/${chatId}`, {
            withCredentials: true,
          });
          console.log("Fetched messages for chatId:", chatId, response.data);
          if (response.status === 200 && Array.isArray(response.data)) {
            // Store messages using the consistent chatId
            setSelectedChatMessages(chatId, response.data);
          }
        } catch (error) {
          console.error("Failed to fetch messages:", error);
        }
      }
    };
    fetchMessages();
  }, [chatId, selectedChatMessages, setSelectedChatMessages]); // Re-run only when chatId changes

  // --- 2. USE THE KEY: Reading messages for display ---
  const messages = useMemo(
    () => (chatId ? selectedChatMessages[chatId] || [] : []),
    [chatId, selectedChatMessages]
  );

  // --- 3. USE THE KEY: Listening for new messages ---
  useEffect(() => {
    const handleReceiveMessage = (message) => {
      // Check if the incoming message's chatId matches our consistent key
      if (socket && message.chatId === chatId) {
        addMessageToChat(chatId, message);
      }
    };
    if (socket) {
      socket.on(RECEIVE_MESSAGE_SOCKET_EVENT, handleReceiveMessage);
    }
    return () => {
      if (socket) {
        socket.off(RECEIVE_MESSAGE_SOCKET_EVENT, handleReceiveMessage);
      }
    };
  }, [chatId, addMessageToChat]);

  // ... (Auto-scroll and return logic are the same) ...
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  if (!chatId) {
    return (
      <div className="text-white text-center mt-8">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-scroll p-4"
    >
      {messages.length === 0 ? (
        <div className="text-white text-center mt-8">No messages yet</div>
      ) : (
        messages.map((msg, i) => {
          const isSender = msg.sender && msg.sender._id === userInfo.id;
          console.log(msg.sender._id)
          return (
            <div
              key={i}
              className={`flex mb-4 ${
                isSender ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-[70%] ${
                  isSender
                    ? "bg-purple-500 text-white"
                    : "bg-gray-700 text-white"
                }`}
              >
                {msg.messageType === "text" && <span>{msg.content}</span>}
                <div className="text-xs text-gray-300 mt-1">
                  {new Date(msg.timeStamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MessageContainer;