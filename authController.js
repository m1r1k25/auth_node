import Role from "./models/Role.js"
import User from "./models/User.js"
import bcrypt from "bcrypt"
import {validationResult} from "express-validator"
import jwt from "jsonwebtoken"
import config from "./config.js"

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return jwt.sign(payload, config.secret, {expiresIn: "24h"})
}

class AuthController {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if(!errors.isEmpty()) {
        res.status(400).json({message: "Ошибка при регистрации"})
      }
      const { username, password } = req.body
      const candidate = await User.findOne({username})
      if(candidate) {
        return res.status(400).json({message: "Пользователь с таким именем уже существует"})
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({value: "ADMIN"})
      const user = new User({username, password: hashPassword, roles: [userRole.value]})
      await user.save()
      return res.json({message: "Пользователь успешно зарегистрирован"})
    } catch(e) {
      console.log(e)
      res.status(400).json({message: "Registration error"})
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({username})
      if(!user) {
        return res.status(400).json({message: "Такого пользователя не существует"})
      }
      const validPassword = bcrypt.compareSync(password, user.password)
      if(!validPassword) {
        return res.status(400).json({message: "Данный пароль не валиден"})
      }
      const token = generateAccessToken(user._id, user.roles)
      return res.json({token})
    } catch(e) {
      console.log(e)
      return res.status(400).json({message: "Login error"})
    }
  }

  async getUsers(req, res) {
    try {
      const users = await User.find()
      res.json(users)
    } catch(e) {
      console.log(e) 
    }
  }
}

export default new AuthController()