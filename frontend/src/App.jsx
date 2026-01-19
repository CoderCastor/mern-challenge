import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
    Outlet,
} from "react-router-dom";

import { AuthProvider } from "./context/auth/authContext";
import { Login } from "./components/auth/login";
import { AdminDashboard } from "./components/admin/dashboard";
import { ProtectedRoute } from "./components/protected-route";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/unauthorized"
                        element={<div>Unauthorized</div>}
                    />

                    <Route element={<ProtectedRoute />}>
                        <Route
                            path="/"
                            element={
                                <AdminDashboard />
                            }
                        />

                        <Route
                            element={
                                <ProtectedRoute allowedRoles={["ADMIN"]} />
                            }
                        >
                            <Route path="/admin" element={<AdminDashboard />} />
                        </Route>
                    </Route>

                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
