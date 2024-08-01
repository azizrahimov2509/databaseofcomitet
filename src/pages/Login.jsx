import React, { useState } from "react";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth } from "../farebase/config";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, loginData.email, loginData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userData = {
          displayName: user.displayName || "",
          email: user.email || "",
        };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/addInfo");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (
          errorCode === "auth/wrong-password" ||
          errorCode === "auth/user-not-found"
        ) {
          setError("Incorrect email or password. Please try signing up.");
        } else {
          setError(error.message);
        }
      });

    setLoginData({ email: "", password: "" });
  };

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const userData = {
          displayName: user.displayName || "",
          email: user.email || "",
        };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/addInfo");
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const togglePasswordShow = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 relative">
      <form
        className="w-full max-w-md p-8 bg-slate-600 bg-opacity-40 rounded-lg shadow-lg border z-20 border-gray-300"
        onSubmit={handleLogin}
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <div className="form-control mb-4">
          <label className="label" htmlFor="email">
            <span className="label-text text-white text-base font-semibold">
              Email
            </span>
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email..."
            className="input input-bordered w-full"
            value={loginData.email}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, email: e.target.value }))
            }
            required
          />
        </div>
        <div className="form-control mb-4 relative">
          <label className="label" htmlFor="password">
            <span className="label-text text-white text-base font-semibold">
              Password
            </span>
          </label>
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password..."
            className="input input-bordered w-full pr-10"
            value={loginData.password}
            onChange={(e) =>
              setLoginData((prev) => ({ ...prev, password: e.target.value }))
            }
            required
          />
          <button
            type="button"
            className="absolute right-0 pr-3 flex items-center text-gray-400 bottom-4"
            onClick={togglePasswordShow}
          >
            {showPassword ? (
              <FaEyeSlash className="w-5 h-5 text-gray-600" />
            ) : (
              <FaEye className="w-5 h-5 text-gray-600" />
            )}
          </button>
        </div>
        {error && (
          <div className="text-[#ef3434] font-semibold mb-4 text-lg">
            {error}
          </div>
        )}
        <div className="form-control">
          <button type="submit" className="btn btn-primary w-full">
            Log in
          </button>
        </div>
        <div className="form-control mt-4">
          <button
            type="button"
            className="btn w-full btn-accent"
            onClick={handleGoogleLogin}
          >
            <FcGoogle className="w-6 h-6" /> Continue with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
