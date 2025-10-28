import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarImage } from '../../../../../components/ui/avatar'
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from '../../../../../components/ui/input'
import { useEffect, useState } from "react"
import { FaPlus } from 'react-icons/fa'
import Lottie from 'react-lottie'
import { animationDefaultoptions } from '@/lib/utils'
import { apiClient } from '@/lib/api-client'
import { HOST, SEARCH_CONTACTS_ROUTES } from "@/utils/constants"
import { getColor } from '@/lib/utils'
import {createChatSlice} from '@/store/slices/chat-slice'
import {useAppStore} from '@/store'

function NewDM() {
  const { setSelectedChatType, setSelectedChatData } = useAppStore();
  const [width, setWidth] = useState(window.screen.width)
  const [openNewContactModal, setOpenNewContactModal] = useState(false);
  const [searchedContacts, setSearchedContacts] = useState([])

  const searchContacts = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const res = await apiClient.post(
          SEARCH_CONTACTS_ROUTES,
          { searchTerm },
          {
            withCredentials: true
          }
        );

        if (res.status === 200) {
          // console.log(res.data.contacts)
          setSearchedContacts(res.data.contacts)
        }
      } else {
        setSearchedContacts([]);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectContact = async (contact) => {
    setOpenNewContactModal(false);
    setSelectedChatType("contact");
    console.log("Selected Contact:", contact);
    setSelectedChatData(contact);
    setSearchedContacts([]);
  }

  useEffect(() => {
    if (!openNewContactModal) {
      setSearchedContacts([]);
    }
  }, [openNewContactModal]);
  

  useEffect(() => {
    const handleResize = () => setWidth(window.screen.width);
    window.addEventListener('resize',handleResize);
    console.log(window.screen.width)
    return () => window.removeEventListener('resize',handleResize);
  },[]);

  return (
    <div>
      <TooltipProvider  >
        <Tooltip  >
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 text-small hover:text-neutral-100 cursor-pointer transition-all duration-300 "
              onClick={() => { setOpenNewContactModal(true) }}
            />
          </TooltipTrigger>
          <TooltipContent
            className='bg-[#2A2B33] border-none p-2 text-white '

          >
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={openNewContactModal} onOpenChange={setOpenNewContactModal} >
        <DialogContent className='md:w-[400px] md:h-[400px] w-[85vw] h-[320px] bg-[#1B1C24] border-none text-white flex flex-col rounded-xl ' >
          <DialogHeader>

            <DialogTitle>Please Select A Contact</DialogTitle>
            <DialogDescription>
            </DialogDescription>
            <div className="flex flex-col gap-5 justify-end items-center p-4 " >
              <Input placeholder="Search Contacts" className='rounded-lg p-6 bg-[#2A2B33] focus:outline-none active:outline-none focus:border-none border-none '
                onChange={(e) => { searchContacts(e.target.value) }}
              />
            </div>

            {
              searchedContacts.length <= 0 ?
                <div className="w-full h-auto" >
                  <Lottie
                    isClickToPauseDisabled={true}
                    options={animationDefaultoptions}
                    width= {100}
                    height={100}
                  />
                  <h3 className='poppins-medium text-center w-full mt-5 transition-all duration-300 ' >
                    Hi <span className='text-yellow-500' >!</span>  Search New  <span className='text-blue-500' >Contact</span>
                  </h3>
                </div>
                :
                <div>
                  <ScrollArea className='h-[250px]' >
                    <div className="flex flex-col gap-3 "  >
                      {
                        
                        searchedContacts.map((contact) => {
                          return (
                            <div
                              key={contact._id}
                              className="flex items-center hover:shadow-md hover:bg-[#2A2B33] p-2 rounded-xl cursor-pointer "
                              onClick={() => handleSelectContact(contact)}
                            >
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
                              <div className="flex flex-col justify-center w-1/2 ml-3 text-start" >
                                <p className='poppins-medium text-md md:text-lg '>{contact.firstName} {contact.lastName ? contact.lastName : contact.email.split("").shift().toUpperCase()}</p>
                                <p className="text-xs text-neutral-400" >
                                  {
                                    contact.email
                                  }
                                </p>
                              </div>

                            </div>
                          )
                        })
                      }

                    </div>
                  </ScrollArea>
                </div>
                }

          </DialogHeader>
        </DialogContent>

      </Dialog>



    </div>
  )
}

export default NewDM