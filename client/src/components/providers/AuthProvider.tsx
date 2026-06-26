"use client"
import {createContext, useContext, useEffect, useState} from "react"
import axiosInstance from "@/lib/axios"
import { useRouter } from "next/navigation"



interface AuthContextType {
    user: any,
    isAuthenticated: boolean,
    loading: boolean,
    login: (username: string, password: string) => Promise<void>,
    logout: () => Promise<void>,
    
}

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}: {children: React.ReactNode})=>{
    const [user,setUser] = useState<any>(null)
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [loading,setLoading] = useState(true)

    const router = useRouter()
    
    useEffect(()=>{
        async function getUser(){
            try{
                axiosInstance.get('/auth/profile').then((res)=>{
                    setUser(res.data.user)
                    setIsAuthenticated(true)
                    router.replace("/")
                })
            }catch(error){
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getUser()
    },[])

      const login = async(email: string, password: string) => {
        try{
            await axiosInstance.post('/auth/login',{email,password}).then((res)=>{
                setUser(res.data.user)
                setIsAuthenticated(true)
                router.replace("/")
            })
        }catch(error){
            console.log(error)
        }
    }
    const logout = async() => {
        try{
            await axiosInstance.post('/auth/logout')
            setIsAuthenticated(false)
            setUser(null)
            router.replace("/login")
        }catch(error){
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{user,isAuthenticated,loading,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
const useAuth = ()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
}

export {AuthProvider, useAuth};
