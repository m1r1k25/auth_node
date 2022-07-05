import { Router } from "express";

export const authRouter = new Router()

authRouter.post('/registration')
authRouter.post('/login')
authRouter.get('/users')
