/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')
import Swal from "sweetalert2";
import Card from '../components/Card';

export default function Battle() {
  const [cards, setCards] = useState(null)
  const [player, setPlayer] = useState([])
  const [readyPlayer, setReadyPlayer] = useState(null)
  const [enemyStatus, setEnemyStatus] = useState(false)
  const [situation, setSituation] = useState(null)

  useEffect(() => {
    getCard()
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
        setSituation(server_result.situation)
      } else {
        if(server_result.situation === "lose") {
          setSituation("win")
        } else if(server_result.situation === "win") {
          setSituation("lose")
        } else {
          setSituation("draw")
        }
      }
    })
  }, [socket])

  useEffect(() => {
    if(readyPlayer) {
      if(readyPlayer.id !== localStorage.access_token) {
        setEnemyStatus(true)
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
      socket.emit("CLIENT_BATTLE", player)
    }
  }, [player])

  return (
    <>
      <div>
        {enemyStatus ? "Your enemy is ready" : "Your enemy is not ready"}
      </div>
      {situation && <div>{situation}</div>}
      
      <div className="mx-20">
        <form className="grid grid-cols-5 justify-items-center" onSubmit={(e) => {
          e.preventDefault()
          const card_choosen = []
          if(e.target[0].checked) card_choosen.push(cards[0])
          if(e.target[1].checked) card_choosen.push(cards[1])
          if(e.target[2].checked) card_choosen.push(cards[2])
          if(e.target[3].checked) card_choosen.push(cards[3])
          if(e.target[4].checked) card_choosen.push(cards[4])

          socket.emit("CLIENT_SET_PLAYER", {
            id: localStorage.access_token,
            cards: card_choosen
          })
        }}>
          {cards && cards.map((card, i) => {
            return <Card key={card.id} card={card} index={i}/>
          })}
          <button>Go!</button>
        </form>
      </div>
    </>
  )
}