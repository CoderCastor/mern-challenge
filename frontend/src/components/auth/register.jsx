import { userSchemaSignup } from "../../lib/zod.js";
import { Form } from "../common/forms/form.jsx";
export const Register = () => {
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <Form
            zodSchema={userSchemaSignup}
            formTitle={"Signup"}
            handleSubmit={handleSubmit}
        />
    );
};
