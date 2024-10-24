import { useState, useRef, useEffect } from "react"
import { GrAttachment } from 'react-icons/gr'
import { RiEmojiStickerLine } from "react-icons/ri"
import { IoSend } from "react-icons/io5"
import EmojiPicker from 'emoji-picker-react';

function MessageBar() {
  const emojiRef = useRef();
  const [message, setMessage] = useState("")
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [emojiRef])


  const handleAddEmoji = (emoji) => {
    setMessage((msg) => msg + emoji.emoji);
  }

  const handleSendMessage = async () => {

  }

  return (
    <div className="h-[10vh] max-w-[100vw] bg-[#1c1d25] flex justify-center items-center px-8 mb-6 gap-6 " >
      <div className="flex-1 flex bg-[#2a2b33] rounded-md items-center gap-5 pr-5 ">
        <input
          type="text"
          value={message}
          className="flex-1 p-5 bg-transparent rounded-md focus:norder-none focus:outline-none"
          placeholder="Enter Message"
          onChange={(e) => {
            setMessage(e.target.value)
          }}
        />
        <button className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all p-2 rounded-full " >
          <GrAttachment className="text-lg" />
        </button>

        <div className="">
          <button
            className="text-neutral-500 focus:border-none focus:outline-none focus:text-white duration
            -300 transition-all p-2 rounded-full "
            onClick={() => {
              setEmojiPickerOpen(true)
            }}

          >
            <RiEmojiStickerLine className="text-lg" />
          </button>
          <div
            className=" absolute right-0 bottom-0 "
            ref={emojiRef}
          >
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
        className=" bg-[#975AED] rounded-md p-5 flex items-center justify-center focus:outline-none focus:border-none hover:bg-[#8338EC] focus:text-white duration-300 transition-all "
        onClick={handleSendMessage}
      >
        <IoSend className="md:text-lg " />
      </button>


    </div>
  )
}

export default MessageBar