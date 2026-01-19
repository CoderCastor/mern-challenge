import { useNavigate } from "react-router-dom";
import { AuthContext, useAuth } from "../../context/auth/authContext.jsx";
import { userSchemaLogin } from "../../lib/zod.js";
import { Form } from "../common/forms/form.jsx";
import { useContext, useEffect } from "react";

export const Login = () => {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const { user } = useContext(AuthContext)

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
        console.log("state changed",isAuthenticated,user)

    }, [user,isAuthenticated,navigate]);


    const handleSubmit = async (data) => {
        await login(data);
    };

    return (
        <div className="h-full w-full flex justify-center items-center">
            <Form
                formTitle={"Login"}
                zodSchema={userSchemaLogin}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};
