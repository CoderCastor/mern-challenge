import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/auth/authContext";

export const ProtectedRoute = () => {
    const { isLoading, user } = useAuth();

    

    if (isLoading) {
        return <h1>Loading...</h1>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};
