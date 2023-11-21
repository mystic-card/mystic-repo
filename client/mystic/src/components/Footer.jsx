import React from "react";

export function Footer() {
  return (
    <>
      <div className="w-full pt-16 pb-6 text-sm text-center md:text-left fade-in">
        <a className="text-gray-500 no-underline hover:no-underline">
          © Copyright
        </a>
        <a className="text-indigo-400" style={{ marginRight: "5px", marginLeft: "5px"}}>
        - Created by
        </a>
        <a
          className="text-gray-500 no-underline hover:no-underline"
          href="/"
        >
          Mystic
        </a>
      </div>
    </>
  );
}
