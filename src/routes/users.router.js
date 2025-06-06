import express from 'express'
import userController from '../controllers/user.controller.js'


//PASO 1: Creacion de ruta
const usersRouter = express.Router()


 //PASO 3:Creo las consultas que va a tener mi enrutador
usersRouter.get('/', userController.getAll)
usersRouter.post('/register', userController.register)

usersRouter.get('/verify', userController.verify)

usersRouter.get('/resend-verification-mail', userController.resendVerificationEmail)

usersRouter.post('/login', userController.login)

usersRouter.put('/api/users/hola', (request, response) => {
    response.send("Funcionaaa")
})



export default usersRouter



