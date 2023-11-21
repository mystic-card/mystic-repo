const server = require('./bin/www')
const { Server } = require('socket.io')

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
})

io.on("connection", (socket) => {
  socket.on("CLIENT_SET_PLAYER", (player) => {
    io.emit("SERVER_SET_PLAYER", player)
  })
  socket.on("CLIENT_BATTLE", (battle) => {
    let power_1 = 0
    let power_2 = 0

    battle[0].cards.forEach(power => {
      if(power.operator === true) {
        power_1 += power.power
      } else {
        power_2 -= power.power
      }
    })

    battle[1].cards.forEach(power => {
      if(power.operator === true) {
        power_2 += power.power
      } else {
        power_1 -= power.power
      }
    })

    let situation = "draw"
    if(power_1 > power_2) {
      situation = "win"
    } else if(power_1 < power_2) {
      situation = "lose"
    }

    io.emit("SERVER_RESULT", {id: battle[0].id, situation})
  })
})