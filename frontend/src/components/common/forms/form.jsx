import React, { useState } from "react";
import { cn } from "../../../lib/cn";
import {

    IconEye,
    IconEyeClosed,

    IconX,
} from "@tabler/icons-react";

export const Form = ({
    zodSchema,
    formTitle,
    handleSubmit,
    closeForm,
    showCloseButton = false,
}) => {
    const [userData, setUserData] = useState({
        ...Object.keys(zodSchema.shape).reduce((acc, key) => {
            acc[key] = "";
            return acc;
        }, {}),
    });

    const [showError, setShowError] = useState({
        visible: false,
        ...Object.keys(userData).reduce((acc, key) => {
            acc[key] = [];
            return acc;
        }, {}),
    });

    const resetErrors = () => {
        setShowError({
            visible: false,
            ...Object.keys(userData).reduce((acc, key) => {
                acc[key] = [];
                return acc;
            }, {}),
        });
    };

    const handleSubmitForForm = (e) => {
        e.preventDefault();
        const validInput = zodSchema.safeParse(userData);
        if (validInput.error) {
            setShowError({
                visible: true,
                ...validInput.error.flatten().fieldErrors,
            });
            return;
        }
        handleSubmit(validInput.data);
    };

    return (
        <div className="flex relative flex-col px-10 py-10 shadow-sm shadow-black/10 ring-1 ring-black/10 rounded-2xl w-xl mx-auto bg-zinc-100/99">
            {showCloseButton && (
                <button
                    className="bg-black rounded-full p-2 absolute right-5 top-5"
                    onClick={() => closeForm()}
                >
                    <IconX color="white" size={15} />
                </button>
            )}

            <h2 className="text-4xl font-semibold mb-4 px-1">{formTitle}</h2>

            {Object.keys(zodSchema.shape).map((item) => (
                <React.Fragment key={item}>
                    <Input
                        key={item}
                        setUserData={setUserData}
                        name={item}
                        resetErrors={resetErrors}
                    />
                    <p className="text-red-600 text-sm h-7 mx-2">
                        {showError.visible &&
                            showError[item] &&
                            showError[item][0]}
                    </p>
                </React.Fragment>
            ))}
            <button
                className="bg-zinc-700 text-zinc-200 rounded-2xl py-3 text-sm"
                onClick={handleSubmitForForm}
                type="submit"
            >
                Submit
            </button>
        </div>
    );
};

const Input = ({ name, type, classname, setUserData, resetErrors }) => {
    const [showPassword, setShowPassword] = useState(false);

    const onChangeHandler = (e) => {
        setUserData((prev) => {
            let obj = { ...prev };
            obj[e.target.name] = e.target.value;
            return { ...obj };
        });
        resetErrors();
    };

    if (name == "password" || type == "password") {
        return (
            <div className="text-sm justify-between shadow-zinc-black/10 shadow-sm ring-1 ring-black/10 px-3 py-2 rounded-xl flex ">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="outline-0 flex-1"
                    placeholder="Password"
                    onChange={onChangeHandler}
                />
                <button
                    className="rounded-lg px-3 py-2"
                    onClick={() => setShowPassword((prev) => !prev)}
                >
                    {" "}
                    {showPassword ? (
                        <IconEye size={12} />
                    ) : (
                        <IconEyeClosed size={12} />
                    )}
                </button>
            </div>
        );
    }

    if (name == "role" || type == "role") {
        return (
            <div className="shadow-zinc-black/10 shadow-sm ring-1 ring-black/10 text-sm justify-between  px-3 rounded-xl flex items-center">
                <label
                    for="role-select"
                    className="bg-zinc-50 text-sm border-zinc-100 text-zinc-500"
                >
                    Select Role{" "}
                </label>
                <select
                    onChange={onChangeHandler}
                    name="role"
                    id="role-select"
                    className="text-lg border-zinc-100 text-zinc-700 flex-1 px-4 py-2.5 outline-0"
                >
                    <option value="NONE" className="text-sm">
                        None
                    </option>
                    <option value="NORMAL" className="text-sm">
                        Normal
                    </option>
                    <option value="STORE_OWNER">Store Owner</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>
        );
    }

    return (
        <input
            className={cn(
                "shadow-zinc-black/10 shadow-sm ring-1 ring-black/10  text-sm text-zinc-700 outline-0 px-3 py-3 rounded-xl w-full placeholder:capitalize",
                classname,
            )}
            name={name}
            placeholder={name}
            onChange={onChangeHandler}
        />
    );
};
