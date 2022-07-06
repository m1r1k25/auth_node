import Role from "./models/Role.js"
import User from "./models/User.js"
import bcrypt from 'bcrypt'

class AuthController {
  async registration(req, res) {
    try {
      const { username, password } = req.body
      const candidate = await User.findOne({username})
      if(candidate) {
        return res.status(400).json({message: "Пользователь с таким именем уже существует"})
      }
      const hashPassword = bcrypt.hashSync(password, 7)
      const userRole = await Role.findOne({value: "USER"})
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

    } catch(e) {
      console.log(e)
      res.status(400).json({message: "Login error"})
    }
  }

  async getUsers(req, res) {
    try {
      res.json("server work")
    } catch(e) {
      console.log(e)
    }
  }
}

export default new AuthController()