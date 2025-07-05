import React, { useEffect, useState } from "react"
import { stockMarget } from "../../../../assets/images"
import Input from "../../../../components/Input"
import PrimaryButton from "../../../../components/PrimaryButton";
import Logo from "../../../../components/Logo";
import { adminLogIn } from "./services/api"
import ROUTES from "../../../../navigations/routes/routes";
import Loading from "../../../../components/Loading";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

export default function Index(): React.JSX.Element {

    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [userIdError, setUserIdError] = useState<string>("");
    const [passwordrror, setPasswordError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        setUserIdError("");
    }, [userId]);

    useEffect(() => {
        setPasswordError("");
    }, [password])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!userId || userId.length != 7) {
            setUserIdError("Please provide a valid User ID");
            return;
        }

        if(!password || password.length < 6) {
            setPasswordError("Please provide a valid Password");
            return
        }

        //make API call here
        try {
            setIsLoading(true);
            await adminLogIn(userId, password);

            // navigate to home
            window.location.href = ROUTES.OWNER_HOME;
        } catch (error: unknown) {
            if(error instanceof AxiosError)
                toast.error(error?.response?.data?.message || "Failed to login. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-screen h-screen flex flex-col">
            {isLoading && <Loading />}
            <div className="h-[5rem] flex items-center px-10 bg-customSteelBlue">
                <Logo whiteHeading />
            </div>
            <div className="flex-1 flex items-center justify-center bg-gray-300">
                <div className="flex w-[75%] h-[70%] bg-white shadow-lg">
                    <div className="flex w-1/2">
                        <img 
                            src={stockMarget}
                            alt="Login"
                            className="object-cover"
                        />
                    </div>

                    <div className="flex flex-col w-1/2 items-center justify-center">
                        <div className="w-[75%]">
                            <h1 className="text-3xl font-semibold">Welcome</h1>
                            <h3 className="mb-10">Owner Login</h3>
                        </div>

                        <form className="flex flex-col gap-2 w-[75%]"
                            onSubmit={handleSubmit}
                        >
                            <Input 
                                name="userId" 
                                label="User ID" 
                                type="text" 
                                placeholder="abcd123" 
                                onChange={val => setUserId(val)}
                                isErrRequired
                                errorMessage={userIdError}
                            />
                            <Input 
                                name="Password" 
                                label="password" 
                                type="password" 
                                placeholder="••••••"
                                onChange={val => setPassword(val)} 
                                isErrRequired
                                errorMessage={passwordrror}
                            />
                            <div className="w-full flex flex-col gap-2">
                                <PrimaryButton 
                                    label="Login"
                                    type="submit" 
                                />

                                <p>Not owner? <a className="underline text-blue-500" href={ROUTES.MANAGER_LOGIN}>Login as Manager</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
