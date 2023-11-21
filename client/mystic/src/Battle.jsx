import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const socket = io('http://localhost:3000')

export default function Battle() {
  const [player, setPlayer] = useState([])
  const [readyPlayer, setReadyPlayer] = useState(null)
  const [enemyStatus, setEnemyStatus] = useState(false)
  const [situation, setSituation] = useState(null)

  useEffect(() => {
    socket.on("SERVER_SET_PLAYER", (server_player) => {
      setReadyPlayer(server_player)
    })
    socket.on("SERVER_RESULT", (server_result) => {
      if(server_result.id === localStorage.id) {
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
      if(readyPlayer.id !== localStorage.id) {
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
      <button onClick={(e) => {
        e.preventDefault()
        const cards = [
          {power: Math.floor(Math.random() * 10) + 1, operator: true},
          {power: Math.floor(Math.random() * 10) + 1, operator: true},
          {power: Math.floor(Math.random() * 10) + 1, operator: true}
        ]
        socket.emit("CLIENT_SET_PLAYER", {
          id: localStorage.id,
          cards
        })
      }}>Test</button>
      {situation && <div>{situation}</div>}
    </>
  )
}