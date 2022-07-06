import { Router } from "express";
import controller from "./authController.js";
import {check} from "express-validator"
import roleMiddleware from "./middlewares/roleMiddleware.js";

const router = new Router()
router.post('/registration', [
  check('username', "Имя пользователя не может быть пустым").notEmpty(),
  check('password', "Пароль должен содержать не менее 4 символов").isLength({min: 4, max: 10})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(["USER", "ADMIN"]), controller.getUsers)

export default router
