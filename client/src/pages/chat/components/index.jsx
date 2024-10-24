import ChatHeader from './chat-container/components/chat-header/index'
import MessageBar from './chat-container/components/meassage-bar'
import MessageContainer from './chat-container/components/message-container'

function ChatsContainer() {
  return (
    <div className="fixed top-0 min-h-screen w-full bg-[#1c1d25] flex flex-col md:static md:flex-1 " >
        <ChatHeader />      
        <MessageContainer />
        <MessageBar />
    </div>
  )
}

export default ChatsContainer