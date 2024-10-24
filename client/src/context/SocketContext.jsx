import { useContext, useEffect, useRef, createContext } from "react";
import { useAppStore } from '@/store'
import { HOST } from '@/utils/constants'
import { io } from 'socket.io-client'
const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const socket = useRef(null);
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            socket.current = io(HOST, {
                query: {
                    userId: userInfo.id,
                    token: userInfo.token
                },
                withCredentials: true
            })

            socket.current.on('connect', () => {
                console.log('Connected to Socket server');
            })

            const handleRecieveMessage = (message) => {
                const {selectedChatData, selectedChatType} = useAppStore();

                // if(selectedChatType !== undefined && selectedChatData._id === message.sender._id  || selectedChatData._id === message.recipient._id ){
                    
                // }

            }

            // socket.on("recieveMessage",handleRecieveMessage);

            return () => {
                socket.current.disconnect();
            }
        }
    }, [userInfo])

    return (
        <SocketContext.Provider value={socket.current} >
            {children}
        </SocketContext.Provider>
    )
}