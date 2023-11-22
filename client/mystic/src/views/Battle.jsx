/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
import Swal from "sweetalert2";
import Card from '../components/Card';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BackCard } from '../components/BackCard';
import useSound from "use-sound";
import WSound from "../sound/w-sound.mp3"

export default function Battle() {
  const [sound] = useSound(WSound);
  const coderoom = useSelector((state) => state.setCoderoom.coderoom)
  const [cards, setCards] = useState(null)
  const [player, setPlayer] = useState([])
  const [readyPlayer, setReadyPlayer] = useState(null)
  const [enemyStatus, setEnemyStatus] = useState(false)
  const [yourStatus, setYourStatus] = useState(false)
  const navigate = useNavigate()
  sound()

  useEffect(() => {
    if(!coderoom) {
      navigate("/")
    } else {
      getCard()
      socket.emit("CLIENT_ROOM_BATTLE", coderoom)
    }
  }, [])

  async function getCard() {
    try {
      const { data } = await axios({
        url: 'http://localhost:3000/cards',
        headers: {
          Authorization: "Bearer " + localStorage.access_token
        }
      })
      
      setCards(data)
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
      });
    }
  }

  useEffect(() => {
    socket.on("SERVER_SET_PLAYER", (server_player) => {
      setReadyPlayer(server_player)
    })
    socket.on("SERVER_RESULT", (server_result) => {
      if(server_result.id === localStorage.access_token) {
        Swal.fire({
          title: `You ${server_result.situation}!`,
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
        }).then((result) => {
          console.log(result)
          if(result.isConfirmed || result.dismiss === "backdrop") {
            navigate("/")
          }
        })
      } else {
        let situation = "draw"
        if(server_result.situation === "lose") {
          situation = "win"
        } else if(server_result.situation === "win") {
          situation = "lose"
        }
        Swal.fire({
          title: `You ${situation}!`,
          width: 600,
          padding: "3em",
          color: "#716add",
          background: "#fff url(https://sweetalert2.github.io/images/trees.png)",
        }).then((result) => {
          console.log(result)
          if(result.isConfirmed || result.dismiss === "backdrop") {
            navigate("/")
          }
        })
      }
    })
  }, [socket])

  useEffect(() => {
    if(readyPlayer) {
      if(readyPlayer.id !== localStorage.access_token) {
        setEnemyStatus(true)
      } else {
        setYourStatus(true)
      }

      if(player.length < 2) {
        setPlayer((player) => {
          return [
            ...player,
            readyPlayer
          ]
        })
      }

      setReadyPlayer(null)
    }
  }, [readyPlayer])

  useEffect(() => {
    if(player.length === 2) {
      socket.emit("CLIENT_BATTLE", { player, coderoom })
    }
  }, [player])

  return (
    <>
      <div
        className="flex flex-col justify-between h-[110vh] w-full bg-center bg-cover bg-no-repeat"
        style={{
          backgroundImage: 'url("/bg.png")',
        }}
      >
        <div className="mx-20 md:mx-40">
          <div className="grid grid-cols-5 justify-items-center">
            {enemyStatus ? <p className='col-span-5 mx-10 my-32 px-10 py-2 text-white text-xl rounded-3xl bg-purple-600 bg-opacity-50 shadow-xl backdrop-blur-md'>Your enemy is ready</p> : [1,2,3,4,5].map((enemy, index) => <BackCard key={index}/>)}
          </div>
        </div>
        <div className="mx-20 md:mx-40">
          <form className="grid grid-cols-5 justify-items-center" onSubmit={(e) => {
            try {
              e.preventDefault()
              const card_choosen = []
              if(e.target[0].checked) card_choosen.push(cards[0])
              if(e.target[1].checked) card_choosen.push(cards[1])
              if(e.target[2].checked) card_choosen.push(cards[2])
              if(e.target[3].checked) card_choosen.push(cards[3])
              if(e.target[4].checked) card_choosen.push(cards[4])
              if(card_choosen.length !== 3) {
                throw {
                  response: {
                    data: {
                      message: "Please choose 3 card!"
                    }
                  }
                }
              }
    
              socket.emit("CLIENT_SET_PLAYER", {
                id: localStorage.access_token,
                cards: card_choosen,
                coderoom
              })
            } catch (error) {
              Swal.fire({
                icon: "error",
                text: error.response.data.message,
              });
            }
          }}>
            {cards && cards.map((card, i) => {
              return <Card key={card.id} card={card} index={i}/>
            })}
            <div className='col-span-5 m-2'>
              {yourStatus ? <p className='text-white'>You are ready</p> : <button className='rounded-3xl bg-purple-600 bg-opacity-50 px-10 py-2 text-white shadow-xl backdrop-blur-md transition-colors duration-300 hover:bg-purple-600'>Ready!</button>}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}