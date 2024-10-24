import React, { useEffect } from 'react'
import { useAppStore } from '../../store'
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import ContactsContainer from './contacts-container';
import EmptyChatsContainer from './empty-chat-container';
import ChatsContainer from './components';

function Chat() {
  const navigate = useNavigate();
  const { userInfo, selectedChatType } = useAppStore();

  useEffect(() => {

    if (!userInfo.profileSetup) {
      toast("Please Setup Profile to Continue")
      navigate('/profile')
    }

  }, [userInfo, navigate])

  return (
    <div className='flex w-full min-h-screen overflow-hidden text-white  ' >
      <ContactsContainer />
      {
        selectedChatType === undefined ? (
          <EmptyChatsContainer />
        ) : (
          <ChatsContainer />
        )
      }
    </div>
  )
}

export default Chat