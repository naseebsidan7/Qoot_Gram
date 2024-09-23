import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IUser } from '@/Types'
import { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const INITIAL_USER = {
       id: '',
       email: '',
       name: '',
       userName:'',
       imageUrl:'',
       bio:''
}

const INITIAL_STATE = { 
      user: INITIAL_USER,
      isLoading: false,
      isAuthenticated: false,
      setUser: () => {},
      setIsAuthenticated: () => {},
      checkAuthUser: async () => false as boolean,
}

const AuthContext = createContext<IContextType>(INITIAL_STATE);

export function AuthProvider ({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<IUser>(INITIAL_USER)
    const [isLoading, setIsLoading] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const checkAuthUser = async () => {
          setIsLoading(true);
          try {
          const currectAccount = await getCurrentUser()
          console.log(currectAccount,' < === CURRECT ACCOUNT')
          if(currectAccount){
            setUser({
                id: currectAccount.$id,
                name: currectAccount.name,
                userName: currectAccount.userName,
                email: currectAccount.email,
                imageUrl: currectAccount.imageUrl,
                bio: currectAccount.bio
            })
              setIsAuthenticated(true)
              return true
            
          }
            return false

          } catch (error) {
            console.log(error)
            return false
          } finally{
            setIsLoading(false)
          }
    }

    useEffect(() => {
       
          const cookieFallback = localStorage.getItem('cookieFallback')
          if (
            cookieFallback === "[]" 
            || cookieFallback === null
          ) {
            navigate("/sign-in");
          }
          checkAuthUser()
    },[])

const value = {
      user,
      setUser,
      isLoading,
      isAuthenticated,
      setIsAuthenticated,
      checkAuthUser
}

return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

 

export const useUserContext = () => useContext(AuthContext)