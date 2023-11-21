const { User } = require("../models/index");
const { comparePassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const bcrypt = require("bcryptjs");

class AuthController {
  static async register(req, res, next) {
    try {
      //   console.log(req.body);
      const { email, password } = req.body;
      const user = await User.create({ email, password });
      res.status(201).json({
        id: user.id,
        email: user.email,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      // console.log(password)

      // email & password validation
      if (!email) {
        throw { name: "InvalidEmail", field: "email" };
      }
      if (!password) {
        throw { name: "InvalidPassword", field: "password" };
      }

      // check existing user in database
      const user = await User.findOne({ where: { email } });

      // console.log(user);
      if (!user) {
        throw { name: "UserNotFound" };
      }

      // check password match / not
      const compared = comparePassword(password, user.password);
      if (!compared) {
        throw { name: "WrongPassword" };
      }

      // create jwt
      const access_token = createToken({ id: user.id });

      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = AuthController;
