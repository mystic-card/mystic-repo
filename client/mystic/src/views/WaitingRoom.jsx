/* eslint-disable react-hooks/exhaustive-deps */
import { Loading } from "../components/Loading";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { io } from 'socket.io-client'
const socket = io('https://mystic-card-server.nokatotedo.my.id')

export function WaitingRoom() {
  const coderoom = useSelector((state) => state.setCoderoom.coderoom)
  const navigate = useNavigate()

  useEffect(() => {
    if(!coderoom) {
      navigate("/")
    } else {
      socket.emit("CLIENT_ROOM_JOIN", coderoom)
    }
  }, [])

  useEffect(() => {
    socket.on("SERVER_ROOM_JOIN", (server_room_join) => {
      if(server_room_join) {
        navigate('/room')
      }
    })
  }, [socket])

  return (
    <>
      <div
        className="flex flex-col h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/loading.png")',
        }}
      >
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 shadow-lg backdrop-blur-md max-sm:px-8 text-white py-5 mb-3 uppercase">
          <p>The battle begin!!</p>
        </div>
        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 shadow-lg backdrop-blur-md max-sm:px-8 py-5 mb-40">
          <p className="text-white font-medium uppercase">room pin:</p>
          <p className="text-orange-800 text-center text-lg font-extrabold">
            {coderoom}
          </p>
        </div>

        {/* loading */}
        <Loading />

        <div className="rounded-xl bg-gray-800 bg-opacity-50 px-16 shadow-lg backdrop-blur-md max-sm:px-8 text-white py-5 mt-40">
          <p>Wait for your opponent to accept your match...</p>
        </div>
      </div>
    </>
  );
}
