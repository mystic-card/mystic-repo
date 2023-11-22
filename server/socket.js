const server = require('./bin/www')
const { Server } = require('socket.io')
const { Room } = require('./models/index')

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173"
  }
})

io.on("connection", (socket) => {
  socket.on("CLIENT_ROOM_JOIN", (room) => {
    socket.join(room)
  })
  socket.on("CLIENT_ROOM_JOINED", (room) => {
    socket.join(room)
    socket.broadcast.to(room).emit("SERVER_ROOM_JOIN", true)
  })
  socket.on("CLIENT_ROOM_BATTLE", (room) => {
    socket.join(room)
    Room.update({
      status: "started"
    }, {
      where: {
        passcode: room
      }
    })
  })
  socket.on("CLIENT_SET_PLAYER", (player) => {
    io.to(player.coderoom).emit("SERVER_SET_PLAYER", player)
  })
  socket.on("CLIENT_BATTLE", (battle) => {
    let power_1 = 0
    let power_2 = 0

    battle.player[0].cards.forEach(power => {
      if(power.operator === true) {
        power_1 += power.power
      } else {
        power_2 -= power.power
      }
    })

    battle.player[1].cards.forEach(power => {
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

    io.to(battle.coderoom).emit("SERVER_RESULT", {id: battle.player[0].id, situation})
  })
})