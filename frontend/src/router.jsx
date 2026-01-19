import {
    BrowserRouter,
    createBrowserRouter,
    Route,
    Routes,
} from "react-router-dom";
import { Login } from "./components/auth/login";
import { AdminDashboard } from "./components/admin/dashboard";
import { ProtectedRoute } from "./components/protected-route";
import { RootLayout } from "./components/RootLayout";
import { AuthProvider } from "./context/auth/authContext";

export const router = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
};
