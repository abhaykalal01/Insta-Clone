import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import logo from "../assest/Logo.jpg";

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });

    const dispatch = useDispatch();
    const { isLoading, isError, message } = useSelector(
        (state) => state.auth
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(form));
    };

    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#fafafa] px-4">

                {/* Login Card */}
                <div className="w-full max-w-sm border border-gray-300 bg-white p-6">

                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <img
                            src={logo}
                            alt="Instagram"
                            className="w-36 sm:w-40 object-contain"
                        />
                    </div>

                    {/* Error */}
                    {isError && (
                        <p className="text-red-500 text-sm mb-3 text-center">
                            {message}
                        </p>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">

                        <input
                            type="email"
                            placeholder="Phone number, username, or email"
                            className="bg-gray-50 border border-gray-300 text-sm p-2 rounded-sm focus:outline-none focus:border-gray-400"
                            onChange={(e) =>
                                setForm({ ...form, email: e.target.value })
                            }
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="bg-gray-50 border border-gray-300 text-sm p-2 rounded-sm focus:outline-none focus:border-gray-400"
                            onChange={(e) =>
                                setForm({ ...form, password: e.target.value })
                            }
                        />

                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 rounded-md font-semibold mt-2 hover:bg-blue-600 transition"
                        >
                            {isLoading ? "Logging in..." : "Log in"}
                        </button>

                    </form>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="px-3 text-sm text-gray-500">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Extra */}
                    <p className="text-center text-sm text-[#385185] cursor-pointer">
                        Log in with Facebook
                    </p>

                    <p className="text-center text-xs text-gray-500 mt-3 cursor-pointer">
                        Forgot password?
                    </p>

                </div>

                {/* Signup Card */}
                <div className="w-full max-w-sm border border-gray-300 bg-white p-4 text-center mt-3">
                    <p className="text-sm">
                        Don't have an account?{" "}
                        <span className="text-blue-500 font-semibold cursor-pointer">
                            Sign up
                        </span>
                    </p>
                </div>

            </div>
        </>
    );
}

export default Login;