const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    case "SequelizeValidationError":
    case "SequelizeUniqueConstraintError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "InvalidEmail":
      res.status(400).json({ message: "Email is required" });
      break;
    case "InvalidPassword":
      res.status(400).json({ message: "Password is required" });
      break;
    case "UserNotFound":
    case "InvalidToken":
      res.status(404).json({ message: "User Not Found" });
      break;
    case "WrongPassword":
      res.status(400).json({ message: "Please input the correct password" });
      break;
    case "WrongPasscode":
      res.status(400).json({ message: "Invalid passcode" });
      break;
    case "UserMustLogin":
      res.status(400).json({ message: "Please login first" });
      break;
    case "RoomNotFound":
      res.status(404).json({ message: "Room Not Found" });
      break;
    case "RoomUnavailable":
      res.status(404).json({ message: "Room Already Started" })
      break
  }
};

module.exports = errorHandler;
