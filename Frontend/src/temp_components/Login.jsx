import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthUser } from '../redux/appSlice';

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://neo-mail-project.vercel.app/api/v1/user/login", input, {
        headers: { 'Content-Type': "application/json" },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setAuthUser(res.data.user));
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="bg-[#F6F8FC] w-screen h-screen">
      {/* Gmail-style top bar */}
      <div className="flex items-center gap-2 px-6 py-4">
        <img
          src="https://cdn.prod.website-files.com/637f48edfbc9b4ce91c37e03/679a57dbdcafe48d7559beaa_83642ca3-1b07-4308-94e8-7b8c0de4d48a.png"
          alt="logo"
          className="w-8"
        />
        <h1 className="text-2xl font-medium text-gray-600">NeoMail</h1>
      </div>

      {/* Centered form */}
      <div className="flex items-center justify-center mt-10">
        <form
          onSubmit={submitHandler}
          className="bg-white shadow-md rounded-lg px-8 py-6 w-full max-w-sm"
        >
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          <input
            onChange={changeHandler}
            value={input.email}
            name="email"
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          />
          <input
            onChange={changeHandler}
            value={input.password}
            name="password"
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full"
          />
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 rounded-md w-full hover:bg-gray-700"
          >
            Login
          </button>
          <p className="text-sm text-center mt-4">
            Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
