import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalState } from "../context";
import { signupRequest } from "../requests/signup";

const SignUp = () => {
    const [loading, setLoading] = React.useState(false)
    const globalState = useGlobalState()
    const navigate = useNavigate()

    const signup = async (e: any) => {
        e.preventDefault()

        const name: string = e.target.name.value;
        const email: string = e.target.email.value;
        const password: string = e.target.password.value;
        const password2: string = e.target.password2.value;

        if (password !== password2) {
            alert("Passwords do not match")
            return
        }

        try {
            setLoading(true)
            const userData = await signupRequest(name, email, password)
            setLoading(false)
            localStorage.setItem("paas_app", JSON.stringify(userData))
            globalState?.setUser(userData)
            navigate("/")
        } catch (error: any) {
            setLoading(false)
            return alert(error.message)
        }
    }

    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">
                        Sign Up
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={signup}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="name" className="sr-only">
                                Username
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="name"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Username
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="password"
                            />
                        </div>
                        <div>
                            <label htmlFor="password2" className="sr-only">
                                Confirm Password
                            </label>
                            <input
                                id="password2"
                                name="password2"
                                type="text"
                                required
                                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                placeholder="confirm password"
                            />
                        </div>
                    </div>
                    <div>
                        {loading ? (
                            <div className="flex justify-center items-center">
                                <h1 className="text-white">Loading...</h1>
                            </div>
                        ) : (
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-white py-2 px-4 text-sm font-medium text-blue-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Sign Up
                            </button>
                        )}
                    </div>
                </form>
                <button
                    onClick={(e) => navigate("/login")}
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-800 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Sign In
                </button>
            </div>
        </div>
    );
};

export default SignUp;