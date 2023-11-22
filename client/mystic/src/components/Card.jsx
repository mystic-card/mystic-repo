/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Card.css'

export default function Card({ card, index }) {
  const [choosen, setChoosen] = useState(false)

  return (
    <>
      <div className={`${choosen ? "-translate-y-10" : ""} relative flex flex-col text-gray-700 bg-white rounded-xl sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 bg-clip-border transition-all hover:-translate-y-10 shadow-lg shadow-blue-gray-900/50 w-48 hover:z-10`}>
        <input type="checkbox" className="select-card" id={`card-${index}`} onChange={() => {
          choosen === true ? setChoosen(false) : setChoosen(true)
        }}/>
        <label htmlFor={`card-${index}`}>
          <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white h-32 rounded-xl bg-clip-border">
            <img src={card?.imageUrl} className="object-cover w-full h-full" />
          </div>
          <div className="p-6">
            <div className="flex items-center mb-2">
              <p className="flex-1 text-left leading-5 font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {card?.name}
              </p>
              <p className="flex-1 text-right leading-5 font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                {card?.role.replace(",", ", ")}
              </p>
            </div>
            <p className="block font-sans text-lg text-center antialiased font-normal leading-normal text-gray-700 opacity-100">
              <b>{card?.operator ? "+" : "-"}{card?.power}</b>
            </p>
          </div>
        </label>
      </div>
    </>
  );
}