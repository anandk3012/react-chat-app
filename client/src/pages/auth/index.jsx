import React, { useState } from 'react'
import bgImage from '../../assets/login2.png'
import victory from '../../assets/victory.svg'
import Lottie from 'lottie-react';
import animationData from '../../assets/lottie-json.json'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from "sonner"
import { apiClient } from '../../lib/api-client'
import { SIGNUP_ROUTE, LOGIN_ROUTE } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { create } from 'zustand'
import { useAppStore } from '../../store';

const Auth = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { setUserInfo } = useAppStore();



    const validateSignUp = () => {
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (!email.includes('@') || !email.includes('.')) {
            toast.error("Invalid email");
            return false;
        }
        if (!password.length) {
            toast.error("Password is required");
            return false;
        }
        if (password !== confirmPassword) {
            toast.error("Password's do not match!");
            return false;
        }
        return true;
    }
    const validateLogin = () => {
        if (!email.length) {
            toast.error("Email is required");
            return false;
        }
        if (!email.includes('@') || !email.includes('.')) {
            toast.error("Invalid email");
            return false;
        }
        if (!password.length) {
            toast.error("Password is required");
            return false;
        }
        return true;
    }

    const handleLogin = async () => {
        try {
            if (validateLogin()) {
                const res = await apiClient.post(LOGIN_ROUTE,
                    { email, password },
                    { withCredentials: true }
                );

                if(res.status === 400){
                    toast.error("Invalid email or password");
                    return;
                }
                console.log(res.data);
                if (res.data.user.id) {
                    setUserInfo(res.data.user);
                }
                if (res.data.user.profileSetup) {
                    toast.success("Successfully Logged In!")
                    navigate('/chat');
                }
                else {
                    navigate('/profile');
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

const handleSignUp = async () => {
    if (validateSignUp()) {
        const payLoad = { email, password };
        const response = await apiClient.post(
            SIGNUP_ROUTE,
            payLoad,
            { withCredentials: true }
        );
        console.log(response.data);
        if (response.status === 201) {
            if (response.data.user.id) {
                setUserInfo(response.data.user);
                navigate('/profile');
            }
        }
    }
}

return (
    <div className='w-full min-h-screen bg-gray-200 flex justify-center items-center '  >
        {/* Auth section div-1.1 */}
        <div className='w-[70vw] h-auto bg-white text-opacity-90 border-2 border-white shadow-2xl rounded-3xl grid xl:grid-cols-2 p-3 ' >
            <div className='flex flex-col items-center justify-center py-5' >
                <Lottie className='w-1/3 md:w-1/4 h-auto xl:hidden' animationData={animationData} loop={true} autoplay={true} />
                {/* div 2.1 headings*/}
                <div className='flex flex-col gap-1 items-center justify-center p-3' >
                    {/* div 3.1 */}
                    <div className="3 flex items-center justify-center">
                        <h1 className='font-bold text-5xl' >Welcome</h1>
                        <img src={victory} alt="victory" className='h-[100px]' />
                    </div>
                    <p className=" w-3/4 font-semibold text-center text-xl">
                        Fill in the details to get started with the best chat app !
                    </p>
                </div>
                {/* div 2.2 forms */}
                <div className='flex flex-col items-center justify-center w-full' >
                    <Tabs className='w-3/4' defaultValue='login' >
                        <TabsList className="bg-transparent w-full rounded-none" >
                            <TabsTrigger value="login"
                                className="data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:border-b-green-500 text-black text-opacity-90 border-b-2 rounded-none w-full transition-all duration-300 " eventKey="1">Login</TabsTrigger>
                            <TabsTrigger value="signup"
                                className="data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:border-b-green-500 text-black text-opacity-90 border-b-2 rounded-none w-full transition-all duration-300" eventKey="2">SignUp</TabsTrigger>


                        </TabsList>

                        {/* login form */}
                        <TabsContent className="flex flex-col gap-5 mt-10" value="login" >
                            <Input
                                placeholder="Email"
                                type="email"
                                className="rounded-full p-6"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                className="rounded-full p-6"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <Button
                                onClick={handleLogin}
                                className='bg-green-500 hover:bg-green-700 rounded-full  '
                            >
                                Login
                            </Button>
                        </TabsContent>

                        {/* sign up form */}
                        <TabsContent className="flex flex-col gap-5 " value="signup" >
                            <Input
                                placeholder="Email"
                                type="email"
                                className="rounded-full p-6"
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                            />
                            <Input
                                placeholder="Password"
                                type="password"
                                className="rounded-full p-6"
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            <Input
                                placeholder="Confirm Password"
                                type="password"
                                className="rounded-full p-6"
                                value={confirmPassword}
                                onChange={(e) => { setConfirmPassword(e.target.value) }}
                            />
                            <Button
                                onClick={handleSignUp}
                                className='bg-green-500 hover:bg-green-700 rounded-full '
                            >
                                SignUp
                            </Button>
                        </TabsContent>


                    </Tabs>

                </div>
            </div>
            <div className="hidden xl:flex justify-center items-center">
                <img src={bgImage} alt="background login" className='' />
                {/* <img src={altBgImage} alt="background login" className='' /> */}
            </div>
        </div>


    </div>
)
    }

export default Auth