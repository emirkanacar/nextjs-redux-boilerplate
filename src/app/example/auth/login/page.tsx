"use client"

import {useState} from "react";
import {useAppDispatch} from "@/redux/store";
import {setAuth} from "@/redux/slices/authSlice";
import {useRouter} from "next/navigation";

export default function Login() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState("");
    const [loginSuccess, setLoginSuccess] = useState("");

    const user: UserModel = {
        id: "7063eccc-fdee-41ae-a9b7-7b2bd9e64d7f",
        email: "example@example.com",
        password: "example123",
        name: "Name Lastname",
        createdAt: "2024-04-14T16:48:29.978Z",
    }

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (email.length < 3) {
            setEmailError("Email must have a minimum of 3 characters.");
        } else {
            setEmailError("");
        }

        if (password.length < 8) {
            setPasswordError("Password must have a minimum of 8 characters.");
        } else {
            setPasswordError("");
        }

        if (emailError.length === 0 && passwordError.length === 0) {
            if (email === user.email && password === user.password) {
                setLoginError("");
                setLoginSuccess("Your successfully logged in! You will be redirect in few seconds!");

                dispatch(setAuth({
                    user: user,
                    isAuthenticated: true
                }));

                setTimeout(() => {
                    router.push("/example/auth");
                }, 3000);
            } else {
                setLoginError("Your credentials is incorrect!");
            }
        }
    };

    return <>
        <div className="auth-login flex flex-col justify-center items-center pt-40">
            <div className="auth-login-header flex flex-col justify-start">
                <h1 className={"font-extrabold text-4xl"}>Login</h1>
                <p className={"font-thin text-gray-500"}>Enter your credentials!</p>
            </div>

            <div
                className={"auth-login-body flex flex-col justify-end w-1/4 bg-neutral-950 rounded-lg px-8 py-4 mt-8 border border-neutral-800"}>
                {loginError.length > 0 && (
                    <div className={"flex flex-col bg-red-600 px-4 py-3 rounded-lg border border-red-500 mt-2"}>
                        <h1 className={"font-extrabold"}>Error</h1>
                        <p>{loginError}</p>
                    </div>
                )}

                {loginSuccess.length > 0 && (
                    <div className={"flex flex-col bg-green-600 px-4 py-3 rounded-lg border border-green-500 mt-2"}>
                        <h1 className={"font-extrabold"}>Success</h1>
                        <p>{loginSuccess}</p>
                    </div>
                )}

                <form className={"login-form"} onSubmit={handleSubmit}>
                    <div className="pt-2">
                        <label htmlFor="email"
                               className="block text-sm font-medium leading-6 text-gray-400">Email</label>
                        <div className="mt-0.5">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={email}
                                autoComplete="email"
                                className="border border-zinc-700 bg-black rounded-lg text-white placeholder:text-gray-400 w-full pl-4 py-3 focus:border-blue-700 hover:border-blue-700 focus:outline-0 transition-all focus:transition-all hover:transition-all"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {emailError.length > 0 &&
                                <p className={"text-red-400 text-sm pt-1 pl-0.5"}>{emailError}</p>}
                        </div>
                    </div>

                    <div className={"pt-2"}>
                        <label htmlFor="password"
                               className="block text-sm font-medium leading-6 text-gray-400">Password</label>
                        <div className="mt-2">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={password}
                                autoComplete="password"
                                className="border border-zinc-700 bg-black rounded-lg text-white placeholder:text-gray-400 w-full pl-4 py-3 focus:border-blue-700 hover:border-blue-700 focus:outline-0 transition-all focus:transition-all hover:transition-all"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            {passwordError.length > 0 &&
                                <p className={"text-red-400 text-sm pt-1 pl-0.5"}>{passwordError}</p>}
                        </div>
                    </div>

                    <div className="pt-4 flex justify-end">
                        <button type="submit"
                                className="rounded-md bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 focus:transition-all hover:transition-all transition-all">Login
                        </button>
                    </div>
                </form>
            </div>

            <div
                className={"auth-login-body flex flex-col justify-end w-1/4 bg-neutral-950 rounded-lg px-8 py-4 mt-8 border border-neutral-800"}>

                <h1 className={"font-extrabold text-xl"}>Auth Details</h1>
                <p className={"font-thin text-gray-300 pt-2"}>Email: <span className={"font-extrabold"}>{user.email}</span></p>
                <p className={"font-thin text-gray-300 pt-2"}>Password: <span className={"font-extrabold"}>{user.password}</span></p>
            </div>

        </div>
    </>
}
