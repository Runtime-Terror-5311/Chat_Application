import { createContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const backendURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendURL;

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{

    const [token, setToken] = useState(localStorage.getItem("token"));
    const [authUser, setAuthUser] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);

    // check if user is authenticated if so,
    //  set the user data and connect the socket

    const checkAuth = async()=>{
        try {
            const { data } = await axios.get("/api/auth/check");
            if(data.success){
                setAuthUser(data.user),
                connectSocket(data.user)

            }
        } catch (error) {
            toast.error(error.message)
        }
    }


    //Login func to handle user authentication and socket connection


    const login = async(state, credentials)=>{
    try {
        const { data } = await axios.post(`/api/auth/${state}`, credentials);
        if(data.success){
            console.log(data.token);
            setAuthUser(data.userData);
            connectSocket(data.userData);
            axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
            setToken(data.token);
            localStorage.setItem("token", data.token);
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.message);  
    }
}


    // Logout function to handle user logout and socket disconnection

    const logout = async()=>{
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    delete axios.defaults.headers.common["Authorization"];
    toast.success("Logged Out successfully");
    if (socket) socket.disconnect();
}



    // UPDATE PROFILE FUNCTION TO HANDLE USER PROFILE UPDATES

    const updateProfile = async(body)=>{
        try {
            const {data} = await axios.put("/api/auth/update-profile", body)
            if(data.success){
                setAuthUser(data.user);
                toast.success("Profile updated successfully")
            }

        } catch (error) {
            toast.error(data.message)
        }
    }

    // Connect socket function to handle socket connection and online users updates

    const connectSocket = (userData)=>{
        console.log("User connected")
        if(!userData || socket?.connected) return;
        const newSocket = io(backendURL, {
            query: {
                userId: userData._id,

            }
        });
        newSocket.connect();
        setSocket(newSocket);

        newSocket.on("getOnlineUsers",(userIds)=>{
            setOnlineUsers(userIds);
        })
    }

    useEffect(() => {
    if(token){
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        checkAuth();
    }
    
}, [token]);


    const value  = {
        axios,
        authUser,
        onlineUsers,
        socket,
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}