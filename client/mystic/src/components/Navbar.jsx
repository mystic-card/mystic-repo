import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export function Navbar() {
  const navigate = useNavigate();

  function Logout() {
    localStorage.clear();

    Swal.fire({
      title: "Logout Success!",
      text: "See you again!",
      icon: "success",
    });
    navigate("/");
  }

  return (
    <>
      <div className="w-full container mx-auto">
        <div className="w-full flex items-center justify-between">
          <a
            className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
            href="#"
          >
            Mystic
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500">
              card
            </span>
          </a>
          <div className="flex w-1/2 justify-end content-center">
            <Link
              className="inline-block text-blue-300 no-underline hover:text-pink-500 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4 transform hover:scale-125 duration-300 ease-in-out"
              onClick={Logout}
            >
              <img
                src="/logout.png"
                className="fill-current h-6"
                viewBox="0 0 32 32"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
