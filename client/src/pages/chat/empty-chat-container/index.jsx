import Lottie from 'react-lottie'
import { animationDefaultoptions } from '../../../lib/utils'
function EmptyChatsContainer() {
    return (
        <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all p-2"  >
            <Lottie
                isClickToPauseDisabled={true}
                height={200}
                width={200}
                options={animationDefaultoptions}
            />

            <div className="text-opacity-80 text-white flex flex-col gap-5 items-center-mt-10 lg:text-4xl text-2xl transition-all duration-300 text-center " >
                <h3 className='poppins-medium ' >
                    Hi <span className='text-yellow-500' >!</span>  Welcome to  <span className='text-blue-500' >Syncronous</span> Chat App
                </h3>

            </div>

        </div>
    )
}

export default EmptyChatsContainer  