import { RiCloseFill } from 'react-icons/ri'
import { useAppStore } from '../../../../../../store'
import { getColor } from '@/lib/utils'
import { Avatar, AvatarImage } from '../../../../../../components/ui/avatar'
import { HOST } from "@/utils/constants"
function ChatHeader() {

  const { selectedChatData, setSelectedChatType } = useAppStore();
  const contact = selectedChatData;
  return (
    <div className="h-[10vh] border-b-2 border-[#2F303B] flex items-center justify-between px-20  "  >
      <div className="flex gap-5 items-center">

        {/* Current Chat or channel name */}
        <div className="flex gap-3 items-center justify-center">
          <div className='w-14 h-14 relative  ' >
            <Avatar
              className='h-14 w-14 rounded-full overflow-hidden mr-2 '
            >
              {
                contact.image ?
                  <AvatarImage src={`${HOST}/${contact.image}`} alt='profile' className='object-cover w-full h-full bg-black/50 ' />
                  :
                  <div className={`uppercase h-14 w-14 text-md border-[1px] flex items-center justify-center rounded-full ${getColor(contact.color)} `} >
                    {contact.firstName ? contact.firstName.split("").shift() : contact.email.split("").shift()}
                  </div>
              }
            </Avatar>
          </div>
          <div className='flex flex-col justify-center items-start
            text-start' >
            <p className='text-lg' >{contact.firstName} {contact.lastName ? contact.lastName : contact.email.split("").shift().toUpperCase()}</p>
            <p className='text-xs text-neutral-400' >{contact.email}</p>
          </div>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <button className='text-neutral-500 focus:border-none focus:outline-none focus:text-white duration-300 transition-all p-2 rounded-full ' >
            <RiCloseFill onClick={() => setSelectedChatType(undefined)} className='text-2xl' />
          </button>
        </div>

      </div>
    </div>
  )
}

export default ChatHeader