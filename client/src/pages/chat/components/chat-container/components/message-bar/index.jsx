import { useState, useRef, useEffect } from "react";
import { GrAttachment } from 'react-icons/gr';
import { RiEmojiStickerLine } from "react-icons/ri";
import { IoSend } from "react-icons/io5";
import EmojiPicker from 'emoji-picker-react';
import { apiClient } from '@/lib/api-client';
import { SEND_MESSAGE } from '../../../../../../utils/constants';
import { useAppStore } from '@/store';
import { socket } from '@/socket-client.js'; // make sure your socket instance is exported

function MessageBar() {
  const emojiRef = useRef();
  const [message, setMessage] = useState("");
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  const { selectedChatData, addMessageToChat, userInfo } = useAppStore();

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAddEmoji = (emoji) => {
    setMessage(msg => msg + emoji.emoji);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || !selectedChatData || !userInfo) return;
    const userIds = [userInfo.id, selectedChatData._id].sort();
    const chatId = userIds.join("-");
    const apiPayload = {
      chatId : chatId,
      recipientId: selectedChatData._id,
      content: message,
      messageType: "text",
    };
    console.log("Sending API Payload:", apiPayload);
    const socketPayload = {
      chatId, // include chatId
      sender: {id : userInfo.id}, // Ensure sender is an object with id
      recipient: {id : selectedChatData._id},
      content: message,
      messageType: "text",
      timeStamp: new Date().toISOString(),
    };

    try {
      const res = await apiClient.post(SEND_MESSAGE, apiPayload, { withCredentials: true });
      if (res.status === 201) {
        setMessage("");
        // if (socket) { 
        //   socket.emit("send-message", socketPayload);
        // }else {
        //   console.error("Socket not initialized. Cannot send message.");
        // }

        // Add to chat-specific messages
        addMessageToChat(chatId, socketPayload);
      }
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <div className="h-[10vh] max-w-[100vw] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6">
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5">
        <input
          type="text"
          value={message}
          className="flex-1 p-5 bg-transparent rounded-md focus:outline-none"
          placeholder="Enter Message"
          onChange={e => setMessage(e.target.value)}
        />
        <button className="text-neutral-500 p-2 rounded-full">
          <GrAttachment className="text-lg" />
        </button>

        <div>
          <button
            className="text-neutral-500 p-2 rounded-full"
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-lg" />
          </button>
          <div className="absolute right-0 bottom-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleAddEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>

      <button
        className="bg-[#975AED] rounded-md p-5 flex items-center justify-center hover:bg-[#8338EC] transition-all"
        onClick={handleSendMessage}
      >
        <IoSend className="md:text-lg" />
      </button>
    </div>
  );
}

export default MessageBar;
