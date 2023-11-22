const { User, Room } = require("../models/index");
const randomstring = require("randomstring");

class RoomController {
  static async createRoom(req, res, next) {
    try {
      //   console.log(req.user.id + " <<<<<<");
      const data = await Room.create({
        HostId: req.user.id,
        passcode: randomstring.generate(4),
      });
      res.status(201).json({
        RoomId: data.id,
        HostId: data.HostId,
        passcode: data.passcode,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getRoomById(req, res, next) {
    try {
      const { passcode } = req.params;
      // console.log(req.body + " <<<<<<");
      const data = await Room.findOne({
        where: { passcode },
      });

      if(!data) {
        throw { name: "RoomNotFound" };
      }

      if(data.status === "started") {
        throw { name: "RoomUnavailable" }
      }
      
      res.status(200).json(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = RoomController;
