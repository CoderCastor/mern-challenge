import { Outlet } from "react-router-dom";
import { AuthProvider } from "../context/auth/authContext";


export const RootLayout = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};