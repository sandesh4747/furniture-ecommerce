import React, { useState } from "react";
import {
  useUserLoginMutation,
  useUserSignupMutation,
} from "../../pages/Auth-Page/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/user/userSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [userLogin, { isLoading: isLogin }] = useUserLoginMutation();
  const [userSignup, { isLoading: isSignup }] = useUserSignupMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userLogin({ email, password }).unwrap();
      dispatch(setUser(response?.user));
      navigate("/");

      toast.success("Login Successful");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await userSignup({ username, email, password }).unwrap();
      dispatch(setUser(response?.user));
      navigate("/");
      toast.success("Signup Successful");
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <div className="w-full flex flex-col lg:flex-row justify-center my-20 sm:px-14 px-6 md:px-20 lg:px-25 xl:px-32 gap-16">
      {/* Log In Section */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl md:text-4xl font-semibold">Log In</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="mt-8">
            <p className="text-base font-medium pb-3">
              Username or email address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="h-[60px] w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] px-4"
              type="text"
            />
          </div>

          <div className="mt-8">
            <p className="text-base font-medium pb-3">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="h-[60px] w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] px-4"
              type="password"
            />
          </div>

          <div className="mt-8 flex items-center gap-3">
            <input
              className="h-[20px] w-[20px] border border-[#9F9F9F] cursor-pointer"
              type="checkbox"
            />
            <p className="text-base font-normal">Remember me</p>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            <button
              type="submit"
              className="text-lg font-normal px-8 py-3 border rounded-[15px] hover:bg-black hover:text-white transition-all duration-200"
            >
              Log In
            </button>
            <p className="text-base font-light cursor-pointer hover:underline">
              Lost Your Password?
            </p>
          </div>
        </form>
      </div>

      {/* Register Section */}
      <div className="w-full lg:w-1/2">
        <h1 className="text-3xl md:text-4xl font-semibold">Register</h1>
        <form onSubmit={handleSignupSubmit}>
          <div className="mt-8">
            <p className="text-base font-medium pb-3">Username</p>
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="h-[60px] w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] px-4"
              type="text"
            />
          </div>
          <div className="mt-8">
            <p className="text-base font-medium pb-3">Email address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              className="h-[60px] w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] px-4"
              type="email"
            />
          </div>

          <div className="mt-8">
            <p className="text-base font-medium pb-3">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="h-[60px] w-full max-w-[423px] border border-[#9F9F9F] rounded-[10px] px-4"
              type="password"
            />
          </div>

          <div className="mt-8">
            <p className="text-sm font-light max-w-[453px]">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our{" "}
              <span className="font-semibold">privacy policy</span>.
            </p>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="text-lg font-normal px-8 py-3 border rounded-[15px] hover:bg-black hover:text-white transition-all duration-200"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
