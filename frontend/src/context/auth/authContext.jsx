import { useEffect, useState, createContext, useContext } from "react";
import api from "../../lib/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const response = await api.get("/user/getme");
                if (response.data.success) {
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (e) {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };
        checkUserLoggedIn();
    }, [isLoading]);

    const logout = async () => {
        try {
            await api.post("/auth/logout");
            setUser(null);
        } catch (e) {
            console.error(e);
        }
    };

    const login = async (payload) => {
        try {
            setIsLoading(true);

            const response = await api.post("/auth/login", payload);
            if (response.data.success) {
                toast.success("Login Successfull");
                setIsLoading(false);
            }
        } catch (error) {
            toast.error(error.response.data.message);
            setIsLoading(false);
        }
    };

    const value = {
        user,
        setUser,
        login,
        logout,
        role: user?.role || null,
        isAuthenticated: !!user,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading ? children : null}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
