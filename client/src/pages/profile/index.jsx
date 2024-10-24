import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store'
import { IoArrowBack } from 'react-icons/io5'
import { FaTrash, FaPlus } from 'react-icons/fa'
import { Avatar, AvatarImage } from '../../components/ui/avatar'
import { colors, getColor } from '../../lib/utils';
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { apiClient } from '../../lib/api-client'
import { HOST, REMOVE_PROFILE_IMAGE, UPDATE_PROFILE, UPDATE_PROFILE_IMAGE } from '../../utils/constants'

function Profile() {
  const img = '../../../../server/';
  const { userInfo, setUserInfo } = useAppStore();
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectedColor, setSelectedColor] = useState();

  const fileInputRef = useRef(null);


  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectedColor(userInfo.color);
    }
    if (userInfo.image) {
      setImage(`${HOST}/${userInfo.image}`)
    } else {
      setImage(null);
    }
  }, [userInfo])


  const validateProfile = () => {
    if (!firstName || !lastName || !selectedColor) {
      toast.error("Please fill in all fields")
      return false;
    }
    return true;
  }

  const saveChanges = async () => {
    if (validateProfile()) {
      try {
        const res = await apiClient.post(
          UPDATE_PROFILE,
          {
            firstName,
            lastName,
            color: selectedColor
          },
          {
            withCredentials: true
          }
        );

        if (res.status === 200 && res.data) {
          setUserInfo({ ...res.data });
          toast.success("Profile updated successfully");
          console.log(res.data);
          navigate('/chat')
        }

      } catch (error) {
        console.error(error.message);
      }
    }
  }

  const handleBackArrow = () => {
    if (userInfo.profileSetup) {
      navigate('/chat')
    }
    else {
      toast.error("Setup Profile Not Complete !")
    }
  }

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  }

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    // console.log({ file })
    if (file) {
      const formData = new FormData;
      formData.append('profile-image', file);
      const res = await apiClient.post(
        UPDATE_PROFILE_IMAGE,
        formData,
        {
          withCredentials: true
        }
      );

      if (res.status === 200 && res.data.image) {
        setUserInfo({ ...userInfo, image: res.data.image });
        toast.success("Profile image updated successfully");
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result)
      }
      reader.readAsDataURL(file);
    }


  }

  const handleDeleteImage = async () => {
    try {
      const res = await apiClient.delete(
        REMOVE_PROFILE_IMAGE,
        {
          withCredentials: true
        }
      );

      if (res.status === 200) {
        setUserInfo({ ...userInfo, image: null });
        toast.success("Profile Image Removed Successfully!");
      }

    } catch (error) {
      setImage(null);
      console.error(error.message);
    }
  }

  return (
    <div className='bg-[#1b1c24] min-h-screen w-full flex flex-col items-center justify-center p-3 text-white ' >
      <div className='flex flex-col w-[80vw] md:w-max ' >
        <div>
          <IoArrowBack className='text-5xl cursor-pointer hover:bg-[#2C2E3B] rounded-full p-3 ' onClick={handleBackArrow} />
        </div>
        <div className='grid grid-cols-2 p-4' >
          <div
            className='relative h-full w-48 md:w-48 flex items-center justify-center'
            onMouseEnter={() => { setHovered(true) }}
            onMouseLeave={() => { setHovered(false) }}
          >
            <Avatar
              className='h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden'
            >
              {
                image ?
                  <AvatarImage src={image} alt='profile' className='object-cover w-full h-full bg-black/50 ' />
                  :
                  <div className={`absolute uppercase h-32 w-32 md:h-48 md:w-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(selectedColor)} `} >
                    {firstName ? firstName.split("").shift() : userInfo.email.split("").shift()}
                  </div>
              }
            </Avatar>
            {
              hovered &&
              <div
                className='absolute top-auto left-auto right-auto bottom-auto h-32 w-32 md:w-48 md:h-48 inset-0 flex items-center justify-center cursor-pointer bg-black/90 ring-fuchsia-50 rounded-full overflow-hidden'
                onClick={image ? handleDeleteImage : handleFileInputClick}
              >
                {
                  image ? <FaTrash className=' text-white text-xl md:text-3xl ' /> : <FaPlus className=' text-white text-3xl ' />
                }
              </div>
            }

            <input
              type="file"
              ref={fileInputRef}
              className='hidden'
              onChange={handleImageChange}
              name='profile-image'
              accept=".png ,.jpg ,.svg ,.webp"
            />


          </div>
          <div className='flex min-w-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center' >
            <div className="w-full">
              <Input placeholder="Email" type="email" disabled value={userInfo.email} className='rounded-lg p-6 bg-[#2c2e3b] border-none ' />
            </div>
            <div className='w-full' >
              <Input placeholder="First Name" type="text" value={firstName} onChange={(e) => { setFirstName(e.target.value) }} className='rounded-lg p-6 bg-[#2c2e3b] border-none ' />
            </div>
            <div className='w-full' >
              <Input placeholder="Last Name" type="text" value={lastName} onChange={(e) => { setLastName(e.target.value) }} className='rounded-lg p-6 bg-[#2c2e3b] border-none ' />
            </div>
            <div className="w-full flex gap-5">
              {
                colors.map((color, index) => (
                  <div
                    key={index}
                    className={`${color} h-8  w-8 rounded-full cursor-pointer transition-all duration-300 ${selectedColor === index ? "outline outline-white outline-2" : ""} `}
                    onClick={() => setSelectedColor(index)}
                  >
                  </div>
                ))
              }
            </div>
          </div>
        </div>

        <div className='w-full' >
          <Button
            className={`h-16 w-full  ${getColor(selectedColor)} transition-all duration-300 rounded-xl border-none `}
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>

      </div>
    </div>
  )
}

export default Profile