import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { setCoderoom } from "../store/coderoom";
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')

export function Home() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function createRoom() {
    try {
      const { data } = await axios({
        method: "POST",
        url: "http://localhost:3000/room",
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })
      
      dispatch(setCoderoom(data))
      navigate('/waiting')
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  }

  async function joinRoom(input) {
    try {
      const { data } = await axios({
        url: `http://localhost:3000/room/${input}`,
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })

      socket.emit("CLIENT_ROOM_JOINED", data.passcode)
      dispatch(setCoderoom(data))
      navigate('/room')
    } catch (error) {
      console.log(error)
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  }

  return (
    <>
      <div
        className="flex h-screen w-full items-center justify-center bg-gray-900 bg-cover bg-no-repeat leading-normal tracking-normal bg-cover"
        style={{ backgroundImage: 'url("header.png")' }}
      >
        <div className="h-full">
          {/*Nav*/}
          <Navbar />

          {/*Main*/}
          <div className="container pt-24 md:pt-36 mx-auto flex flex-wrap flex-col md:flex-row items-center">
            {/*Left Col*/}
            <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
              <h1 className="my-4 text-3xl md:text-5xl text-white opacity-75 font-bold leading-tight text-center md:text-left">
                Join
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-pink-500 to-purple-500" style={{marginLeft: "15px", marginRight: "10px"}}>
                  Or Create
                </span>
                Your Game
              </h1>
              <p className="leading-normal text-base md:text-2xl mb-8 text-center md:text-left text-indigo-400">
                Let&apos;s enjoy the game together!
              </p>
              <form className="bg-gray-900 opacity-75 w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
                onSubmit={(e) => {
                  try {
                    e.preventDefault()
                    if(!(e.target[0].value)) throw { response: { data: { message: "Invalid passcode" } } }
                    joinRoom(e.target[0].value)
                  } catch (error) {
                    Swal.fire({
                      icon: "error",
                      text: error.response.data.message,
                    });
                  }
                }}>
                <div className="mb-4">
                  <label
                    className="block text-blue-300 py-2 font-bold mb-2"
                    htmlFor="emailaddress"
                  >
                    Add your game PIN here
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="text"
                    placeholder="Game PIN"
                  />
                </div>
                <div className="flex items-center justify-between pt-4">
                  <button
                    className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                    type="submit"
                  >
                    Join
                  </button>
                  <Link to="#" className="bg-gradient-to-r from-purple-800 to-green-500 hover:from-pink-500 hover:to-green-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out capitalize"
                    onClick={() => {
                      createRoom()
                    }}>
                    create room
                  </Link>
                </div>
              </form>
            </div>
            {/*Right Col*/}
            <div className="w-full xl:w-3/5 p-12 overflow-hidden">
              <img
                className="mx-auto w-full md:w-4/5 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
                src="macbook.png"
              />
            </div>
            {/*Footer*/}
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
