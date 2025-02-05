import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function Register({ closeModal }) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { username, password } = data;
    try {
      const { data } = await axios.post("/register", { username, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({ username: "", password: "" });
        toast.success("Welcome! 🎉");
        navigate("/login");
        closeModal(); 
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="relative p-6 rounded-lg shadow-lg max-w-md mx-auto poppins-light">

        <h1 className="text-center text-xl font-bold mb-4">
          Create an Account
        </h1>

        <form onSubmit={registerUser} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={data.username}
              onChange={(e) => setData({ ...data, username: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-accentgreen/80 text-white font-semibold py-2 rounded-lg hover:bg-accentgreen"
          >
            Register
          </button>
        </form>
      </div>

  );
}
