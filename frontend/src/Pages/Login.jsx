import React, { useContext, useState, useEffect } from "react";
import lock_icon from "../assets/assets/lock_icon.svg";
import mail_icon from "../assets/assets/mail_icon.svg";
import person_icon from "../assets/assets/person_icon.svg";

import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/Context";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Sign up");
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);

  // 🔁 Reset form fields when toggling between Login / Signup
  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
  }, [state]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.withCredentials = true;

      const endpoint = state === "Sign up" ? "/api/auth/register" : "/api/auth/login";
      const payload = state === "Sign up" 
        ? { Name, Email, Password } 
        : { Email, Password };

      const { data } = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (data.success) {
        localStorage.setItem("token", data.token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

        setIsLoggedin(true);
        toast.dark(state === "Sign up" ? "Registration Successful" : "User is Logged In");

        const userData = await getUserData();

        if (data.role === "admin" || userData?.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sign up" ? "Create an Account" : "Login to Your Account"}
        </h2>
        <p className="text-center text-sm mb-6">
          {state === "Sign up"
            ? "Create your account to get started"
            : "Login to access your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sign up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
              <img src={person_icon} alt="Person Icon" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={Name}
                className="bg-transparent outline-none w-full text-white"
                type="text"
                placeholder="Full Name"
                required
              />
            </div>
          )}

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={mail_icon} alt="Mail Icon" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
              className="bg-transparent outline-none w-full text-white"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
            <img src={lock_icon} alt="Lock Icon" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
              className="bg-transparent outline-none w-full text-white"
              type="password" // ✅ Corrected from "Password"
              placeholder="Password"
              required
            />
          </div>

          <p
            onClick={() => navigate("/reset-Password")}
            className="mb-4 text-indigo-500 cursor-pointer"
          >
            Forgot Password?
          </p>

          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 font-medium text-white"
          >
            {state}
          </button>
        </form>

        <p className="text-gray-400 text-center text-xs mt-4">
          {state === "Sign up" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-400 cursor-pointer underline"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sign up")}
                className="text-blue-400 cursor-pointer underline"
              >
                Sign Up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
