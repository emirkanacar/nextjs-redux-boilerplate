"use client"

import {useEffect, useState} from "react";
import {store, useAppDispatch} from "@/redux/store";
import {useRouter} from "next/navigation";
import {logout} from "@/redux/slices/authSlice";

export default function AuthPage() {
    const dispatch = useAppDispatch();
    const [user, setUser] = useState<UserModel | null>(null)
    const [userIsAuthenticated, setUserIsAuthenticated] = useState<boolean>(false)

    const router = useRouter();

    useEffect(() => {
        setUser(store.getState().auth.user)
        setUserIsAuthenticated(store.getState().auth.isAuthenticated);
    }, []);

    const logoutUser = () => {
        dispatch(logout());
        setUserIsAuthenticated(false);
        setUser(null);
    }

    return <>
        <div className="auth-home px-10 py-10">
            <div className="auth-header flex flex-row justify-between">
                <div className="auth-brand">
                    <h1 className={"font-extrabold text-4xl"}>Auth Example</h1>
                    <p className={"font-thin text-gray-300"}>Home Page</p>
                </div>

                <div className="auth-actions">
                    {userIsAuthenticated ? (
                        <>
                            <div className="flex flex-row">
                                <button
                                    onClick={() => {
                                        router.push("/example/auth/profile");
                                    }}
                                    className="rounded-md bg-neutral-800 border border-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-neutral-700 focus:transition-all hover:transition-all transition-all mr-4">
                                    {user?.name}
                                </button>
                                <button
                                    onClick={() => {
                                        logoutUser();
                                    }}
                                    className="rounded-md bg-neutral-800 border border-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-neutral-700 focus:transition-all hover:transition-all transition-all">
                                    Log Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => {
                                    router.push("/example/auth/login");
                                }}
                                className="rounded-md bg-neutral-800 border border-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:bg-neutral-700 focus:transition-all hover:transition-all transition-all">
                                Log In
                            </button>
                        </>
                    )}
                </div>
            </div>

            <div className="auth-body pt-20">
                <p className={"text-xl"}>Welcome the home page</p>
                <p className={"pt-6"}>Login Status: {userIsAuthenticated ?
                    <span className={"font-extrabold text-green-700"}>Authenticated</span> :
                    <span className={"font-extrabold text-red-600"}>Unauthenticated</span>}</p>
            </div>
        </div>
    </>
}
