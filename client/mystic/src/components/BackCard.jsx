import { useState } from "react";

export function BackCard() {
  const [choosen, setChoosen] = useState(false);

  return (
    <>
      <div className="flex-row flex">
        <div className="relative flex flex-col text-gray-700 bg-white rounded-xl bg-clip-border transition-all hover:-translate-y-10 shadow-lg shadow-blue-gray-900/50 w-48 hover:z-10">
          <div className="card">
            <img src="/b-card.png" alt="Card" />
          </div>
        </div>

        <div className="relative flex flex-col text-gray-700 bg-white rounded-xl bg-clip-border transition-all hover:-translate-y-10 shadow-lg shadow-blue-gray-900/50 w-48 hover:z-10">
          <div className="card">
            <img src="/b-card.png" alt="Card" />
          </div>
        </div>

        <div className="relative flex flex-col text-gray-700 bg-white rounded-xl bg-clip-border transition-all hover:-translate-y-10 shadow-lg shadow-blue-gray-900/50 w-48 hover:z-10">
          <div className="card">
            <img src="/b-card.png" alt="Card" />
          </div>
        </div>

        <div className="relative flex flex-col text-gray-700 bg-white rounded-xl bg-clip-border transition-all hover:-translate-y-10 shadow-lg shadow-blue-gray-900/50 w-48 hover:z-10">
          <div className="card">
            <img src="/b-card.png" alt="Card" />
          </div>
        </div>
      </div>
    </>
  );
}
