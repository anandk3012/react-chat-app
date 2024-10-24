import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { getColor } from '@/lib/utils'
import { useAppStore } from '../../../../../store'
import { HOST, LOGOUT_ROUTE } from '../../../../../utils/constants';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FiEdit2 } from 'react-icons/fi'
import { IoPowerSharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import { apiClient } from '@/lib/api-client'

function ProfileInfo() {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useAppStore();
    const image = userInfo.image;
    const firstName = userInfo.firstName;
    const lastName = userInfo.lastName;
    const selectedColor = userInfo.color;

    const logOut = async () => {
        try {
            const res = await apiClient.post(
                LOGOUT_ROUTE,
                {},
                {
                    withCredentials:true
                }
            )        
            if(res.status===200 ){
                setUserInfo(null);
                navigate('/auth')
            }    
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div className="absolute  bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]" >
            <div className="flex gap-3 items-center justify-center " >
                <div className='w-12 h-12 relative  ' >
                    <Avatar
                        className='h-12 w-12 rounded-full overflow-hidden'
                    >
                        {
                            image ?
                                <AvatarImage src={`${HOST}/${image}`} alt='profile' className='object-cover w-full h-full bg-black/50 ' />
                                :
                                <div className={`uppercase h-12 w-12 text-lg border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)} `} >
                                    {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                                </div>
                        }
                    </Avatar>
                </div>

                <div>
                    {
                        firstName && lastName ?
                            `${firstName} ${lastName}`
                            : ""
                    }
                </div>
            </div>

            <div className='flex gap-5' >
                <TooltipProvider  >
                    <Tooltip  >
                        <TooltipTrigger>
                            <FiEdit2 className='text-purple-500 text-lg font-medium ' onClick={() => {navigate('/profile')}} />
                        </TooltipTrigger>
                        <TooltipContent className='bg-[#5b2aa0c9] border-none text-white mb-2 '  >
                            <p>Edit Profile</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <TooltipProvider  >
                    <Tooltip  >
                        <TooltipTrigger>
                            <IoPowerSharp 
                            onClick={logOut}
                            className='text-red-500 text-lg font-medium '/>
                        </TooltipTrigger>
                        <TooltipContent className='bg-[#392131] border-none text-white mb-2  '  >
                            <p>Logout</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>

        </div>
    )
}

export default ProfileInfo