const { decodeToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    // console.log(req.headers);
    const { authorization } = req.headers;

    if (!authorization) throw { name: "UserMustLogin" };

    const rawToken = authorization.split(" ");
    if (rawToken.length < 2) {
      throw { name: "TokenMalformed", message: "Token malformed" };
    }

    if (rawToken[0] !== "Bearer") {
      throw { name: "WrongSchemes", message: "Wrong auth schemes" };
    }
    const token = rawToken[1];
    const payload = decodeToken(token);
    // console.log(payload)
    const user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "InvalidToken"};
    }

    req.user = user;
    // console.log(payload)
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;