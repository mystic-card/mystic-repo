import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export function Login() {
  const navigate = useNavigate();
  const [inputForm, setInputForm] = useState({ email: "", password: "" });

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setInputForm({ ...inputForm, [name]: value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post(
        "http://34.142.244.149/login",
        inputForm
      );

      localStorage.setItem("access_token", data.access_token);
      Swal.fire({
        title: "Welcome!",
        icon: "success",
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  };

  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/login.png")',
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
          <div className="text-white">
            <div className="mb-8 flex flex-col items-center">
              <img src="icon.png" width={150} alt="ML Logo" />
              <h1 className="mb-2 text-2xl">Mystic Card</h1>
              <span className="text-gray-300">Enter Login Details</span>
            </div>
            <form onSubmit={submitHandler}>
              <div className="mb-4 text-lg">
                <input
                  onChange={inputHandler}
                  className="rounded-3xl border-none bg-purple-600 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="text"
                  name="name"
                  placeholder="name@mail.com"
                />
              </div>
              <div className="mb-4 text-lg">
                <input
                  onChange={inputHandler}
                  className="rounded-3xl border-none bg-purple-600 bg-opacity-50 px-6 py-2 text-center text-inherit placeholder-slate-200 shadow-lg outline-none backdrop-blur-md"
                  type="Password"
                  name="name"
                  placeholder="*********"
                />
              </div>
              <div className="mt-8 flex justify-center text-lg text-black">
                <button
                  type="submit"
                  className="rounded-3xl bg-purple-600 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-purple-600"
                >
                  Login
                </button>
              </div>
              <div className="text-center text-gray-400 hover:underline hover:text-gray-100 py-5">
                <Link to="/register">Haven't an account?</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
