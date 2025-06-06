import userRepository from "../repositories/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import transporter from "../config/mail.config.js";
import { ENVIRONMENT } from "../config/environment.js";

const sendVerificationEmail = async ({ email, name, redirect_url }) => {
  const result = await transporter.sendMail({
    from: ENVIRONMENT.GMAIL_USERNAME,
    to: email,
    subject: "Verifica tu correo electronico",
    html: `<h1>Bienvenido ${name}</h1>
            <p>Necesitamos que des click al siguiente link para verificar
            que esta es tu cuenta. En caso de no reconocer este registro
            desestima este email.<p>
            
            <a href="${redirect_url}">Click aqui para verificar</a>
            <span>Tienes 7 dias para dar click al link</span>
            `,
  });
  console.log("Email enviado", result);
};

class UserController {
  //Especificamos register
  async register(request, response) {
    console.log("Body:", request.body);

    //validamos que lleguen los datos
    if (
      !request.body ||
      !request.body.name ||
      !request.body.password ||
      !request.body.email
    ) {
      response.status(400).send({
        message: "Registro invalido",
        ok: false,
      });
      // return
    }

    // transformamos la contraseña en un bcrypt | El 12 es el nivel de dificultad de contraseña
    let password_hash = await bcrypt.hash(request.body.password, 12);

    // Creamos un usuario en la base de datos con la contraseña(bycrypt)
    await userRepository.create({
      name: request.body.name,
      password: password_hash,
      email: request.body.email,
    });

    //Emitimos un token con una firma, gracias al metodo "sign"
    const verificaction_token = jwt.sign(
      { email: request.body.email },
      "clave_secreta_12334"
    );

    await sendVerificationEmail({
      email: request.body.email,
      name: request.body.name,
      redirect_url: `http://localhost:3000/api/users/verify?verify_token=${verificaction_token}`,
    });

    response.send({
      message: "Recibido. Enviando email de verificacion...",
      ok: true,
    });
  }
  async getAll(request, response) {}

  async verify(request, response) {
    try {
      //Necesitamos capturar el parametro de consulta verify_token
      const verificaction_token = request.query.verify_token;

      //1. Necesito verificar que el token lo emiti yo y que hay token
      if (!verificaction_token) {
        response.status(400).send({
          ok: false,
          message: "Donde esta el token de verificacion",
        });
        //Return para cortar la ejecucion de la funcion
        return;
      }

      //Verify intentara ver si la firma es correcta, en caso de no ser correcta
      //emitira un error
      const contenido = jwt.verify(verificaction_token, ENVIRONMENT.JWT_SECRET_KEY);
      console.log({ contenido });

      //2. Buscar al usuario por el email en la DB y Checkeamos si no esta previamente validado
      //3. (Si el tercer punto da false), cambiamos al usuario de no-verificado a verificado
      await userRepository.verifyUserEmail({ email: contenido.email });
      response.send({
        ok: true,
        message: "Usuario validado con exito",
      });
    } catch (error) {
      console.log("Hubo un error", error);
      if (error.status) { // Checkeo si es un error mio
        response
          .status(error.status)
          .send({ message: error.message, ok: false }

          )
          return //corto mi ejecucion
      }
      else{
        response.status(500).send({ message: "Error interno del servidor", ok: false });
      }
    }
  }

  async login(request, response){
    try {
      const {email, password} = request.body
      if(!email){
        throw {status:400, message: "No hay email"}
      }
      if(!password){
        throw {status:400, message: "No hay password"}
      }

      //PASO 1.a: Buscar al usuario por si se repite en la DB por email
      const user = await userRepository.findByEmail({email:email})
      if(!user){
        throw {status: 404, message: "Usuario no encontrado! "}
      }
      //PASO 1.b: Verificar que el email este validado
      if(!user.verified){
        throw{status: 400, message: "Validá tu email"}
      }
      //PASO 2: Verificar si la contraseña que el cliente pasó coincide con la que tengo en mi DB
      const is_same_password = await bcrypt.compare(password, user.password)
      if(!is_same_password){
        throw {status: 400, message: "Contraseña no valida"}
      }

      //PASO 3: Crear un toke con los datos no-sensibles del usuario(sesion)
      const authorization_token = jwt.sign({
        name: user.name,
        email: user.email,
        created_at: user.created_at
      },
      ENVIRONMENT.JWT_SECRET_KEY
    )
      //PASO 4: Responder con el token que generamos en el paso 3
      response.send({
        ok: true,
        status: 200,
        message: "Usuario logueado",
        data: {
          authorization_token: authorization_token
        }
      })

      
    } catch (error) {
      console.log("Hubo un error", error);
      if (error.status) { 
        response
          .status(error.status)
          .send({ message: error.message, ok: false }

          )
          return 
      }
      else{
        response.status(500).send({ message: "Error interno del servidor", ok: false });
      }
    }
  }

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
      await sendVerificationEmail({email, name:user.name, redirect_url: `http://localhost:3000/api/users/verify?verify_token=${verificaction_token}`})
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

}

const userController = new UserController();

export default userController;
