 **Función para Reenviar Email de Verificación a Usuario No Verificado**

 1. En el archivo user.controller.js hacemos la funcion resendVerificationEmail

 ```js
 async resendVerificationEmail (request, response) {
    try {
      const {email} = request.body
      //1. Buscamos en la DB al usuario por email
      const user = await userRepository.findByEmail({email})
      //2.1 Si no existe lanzamos un error
      if(!user){
        throw {
          status: 404,
          message: "Usuario no encontrado"
        }
      }
      //2.2 Si existe avisamos que ya esta registrado
      if(user.verified){
        throw {
          status: 400,
          message: "El usuario ya esta verificado"
        }
      }
      //3. Creamos un tokken de verificacion para generar la url de verificacion
      const verificaction_token = jwt.sign( { email: email }, ENVIRONMENT.JWT_SECRET_KEY);
      await sendVerificationEmail({email, name:user.name, redirect_url: http://localhost:3000/api/users/verify?verify_token=${verificaction_token}})
      //4. Si todo sale bien respondemos con codigo exitoso
      response.send({
        ok: true,
        message: "Email reenviado con exito",
        status: 200
      })
      return
      
    } catch (error) {
      if (error.status) { 
        response
          .status(error.status)
          .send({ message: error.message, ok: false })
          return 
      }
      
    }
  }

2. Conexion de react a backend
En la raiz de la carpeta backend, ejecutamos el comando:
"npm create vite@latest"
3. Instalar las dependencias con "npm i"
*Ademas en el archivo main.jsx, sacamos el modo estricto
4. En la carpeta src, creamos una carpeta "Screens", creamos carpetas con los nombres, RegisterScreen.jsx, LoginScreen.jsx
y HomeScreen.jsx
5. Instalamos el enrutador con: "npm install react-router-dom"
6. Creamos el capturador de usuarios:
import React, { useState } from 'react'

const LoginScreen = () => {

  const [form_state, setFormState] = useState({email: "", password: ""})

  const handleSubmit = (e) => {
    console.log("Se envio el formulario")
    e.preventDefault()
  }
  console.log("Me cargué")

  const handleChange = (e) => {
    const value = e.target.value
    const field_name = e.target.name
    console.log({value, field_name})

    setFormState(
      (prevFormState) => {
        return {
          ...prevFormState,
          [field_name] : value
        }
      }
    )
  }
  return (
    <div>
      LoginScreen
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Ingresa tu email: </label>
        <input name="email" type="email" id='email'  placeholder='joedoe@mail.com'
        value={form_state.email}
        onChange={handleChange}/>
      </div>

      <div>
        <label htmlFor="password">Ingresa tu contraseña</label>
        <input type="password" name='password' id='password'
        value={form_state.password} 
        onChange={handleChange}/>
      </div>
      <button type='submit'>Iniciar sesion</button>
    </form>
    </div>
  )
}

export default LoginScreen


**SOLUCION AL ERROR CORS**
Es un error porque la ruta del front, quiere entrar al backend. Entonces hay que habilitar eso
a. Instalamos "npm i cors"
b. En el archivo app.js, importamos cors y avisamos que vamos a usar la libreria cors:
import cors from "cors"

const app = express()

//Desahabilita la politica de CORS, RESPETANDO EL ORDEN, ARRIBA DE app.use(Express.json())
app.use(cors())

//Configurar que nuestra API pueda recibir JSON en un body
app.use(express.json())
7.


