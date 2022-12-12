import axios from "axios";
import url from "./utils/url";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const saveUser = (user) => {
        setUser(user);
    }

    const removeUser = () => {
        setUser(null);
    }

    const fetchUser = async () => {
        try {
            const { data } = await axios.get(`${url}/api/v1/user/me`, { withCredentials: true });
            saveUser(data.user);
        } catch (error) {
            removeUser();
        }
        setIsLoading(false);
    }

    const logoutUser = async () => {
        try {
            await axios.delete(`${url}/api/v1/auth/logout`, { withCredentials: true });
            removeUser();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <AppContext.Provider value={{
        user,
        saveUser,
        isLoading,
        logoutUser,
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => {
    return useContext(AppContext);
}