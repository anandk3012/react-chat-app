import { Children, useEffect, useState } from 'react'
// import { Button } from './components/ui/button'
// import { HoverCard, HoverCardTrigger, HoverCardContent } from './components/ui/hover-card'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/auth'
import Profile from './pages/profile'
import Chat from './pages/chat'
import { useAppStore } from './store'
import { GET_USER_INFO } from './utils/constants'
import { apiClient } from './lib/api-client'
import { initializeSocket } from '@/socket-client'
function App() {
  const { userInfo, setUserInfo } = useAppStore();
  const [loading, setLoading] = useState(true);

  const PrivateRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? children : <Navigate to='/auth' />;
  }
  const AuthRoute = ({ children }) => {
    const { userInfo } = useAppStore();
    const isAuthenticated = !!userInfo;
    return isAuthenticated ? <Navigate to='/chat' /> : children;
  }

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, {
          withCredentials: true
        });
        
        if(response.status === 200 && response.data.id){
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        } 
      } catch (error) {
        setUserInfo(undefined)
        console.error(error.message)
      } finally{
        setLoading(false);
      }
    }
    
    if (!userInfo) {
      getUserData();
    } else {
      initializeSocket(userInfo.id);
      setLoading(false);
    }

  }, [userInfo, setUserInfo])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
        <Route path="/chat" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  )
}

export default App
