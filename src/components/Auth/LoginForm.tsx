'use client';

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { FaGithub, FaGoogle } from "react-icons/fa6"

export const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const handleSignInGithub = () => {
        setIsLoading(true);
        signIn('github', { callbackUrl: "/burgers" });
    };

    const handleSignInGoogle = () => {
        setIsLoading(true);
        signIn('google', { callbackUrl: "/burgers" });
    };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const error = urlParams.get('error');

    return (
        <div className="min-h-screen bg-black flex flex-col justify-center sm:py-8">
            <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
                <div className="text-center">
                    <Image src={`/images/cheeseburger-neon.gif`} width={400} height={400} alt="Cheeseburger" />
                </div>
                <h1 className="font-bold text-amber-400 text-3xl text-center mb-4">GOOD BURGER</h1>
                <div className="bg-gray-800 shadow w-full rounded-lg divide-y divide-gray-200">
                    {
                        error && (
                            <div className="bg-red-600 text-white p-4">
                                <span className="font-bold">Something went wrong</span>
                                {
                                    error === 'OAuthAccountNotLinked' && (
                                        <p>
                                            You have an already existent account with other authentication provider, try signing in with the other provider or try a different account that has not been created yet.
                                        </p>
                                    )
                                }
                            </div>
                        )
                    }
                    <div className="px-5 py-7">
                        <button disabled={isLoading} onClick={handleSignInGithub} type="button" className="disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 bg-purple-500 hover:bg-purple-700 focus:bg-purple-700 focus:shadow-sm focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                            <span className="mr-2"><FaGithub className="inline" size={25} /> Continue with Github</span>
                        </button>
                    </div>
                    <div className="px-5 py-7">
                        <button disabled={isLoading} onClick={handleSignInGoogle} type="button" className="disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block">
                            <span className="mr-2"><FaGoogle className="inline" size={20} /> Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
