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
  async register(request, response) {
    console.log("Body:", request.body);

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
    }

    let password_hash = await bcrypt.hash(request.body.password, 12);

    await userRepository.create({
      name: request.body.name,
      password: password_hash,
      email: request.body.email,
    });

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
      const verificaction_token = request.query.verify_token;

      if (!verificaction_token) {
        response.status(400).send({
          ok: false,
          message: "Donde esta el token de verificacion",
        });

        return;
      }

      const contenido = jwt.verify(
        verificaction_token,
        ENVIRONMENT.JWT_SECRET_KEY
      );
      console.log({ contenido });

      await userRepository.verifyUserEmail({ email: contenido.email });
      response.send({
        ok: true,
        message: "Usuario validado con exito",
      });
    } catch (error) {
      console.log("Hubo un error", error);

      if (error.status) {
        response
          .status(error.status)
          .send({ message: error.message, ok: false });
        return;
      } else {
        response
          .status(500)
          .send({ message: "Error interno del servidor", ok: false });
      }
    }
  }

  async login(request, response) {
    try {
      const { email, password } = request.body;
      if (!email) {
        throw { status: 400, message: "No hay email" };
      }
      if (!password) {
        throw { status: 400, message: "No hay password" };
      }

      const user = await userRepository.findByEmail({ email: email });
      if (!user) {
        throw { status: 404, message: "Usuario no encontrado! " };
      }

      if (!user.verified) {
        throw { status: 400, message: "Validá tu email" };
      }

      const is_same_password = await bcrypt.compare(password, user.password);
      if (!is_same_password) {
        throw { status: 400, message: "Contraseña no valida" };
      }

      const authorization_token = jwt.sign(
        {
          name: user.name,
          email: user.email,
          id: user._id,
          created_at: user.created_at,
        },
        ENVIRONMENT.JWT_SECRET_KEY
      );

      response.send({
        ok: true,
        status: 200,
        message: "Usuario logueado",
        data: {
          user: {
            name: user.name,
            email: user.email,
          },
          authorization_token: authorization_token,
        },
      });
    } catch (error) {
      console.log("Hubo un error", error);
      if (error.status) {
        response
          .status(error.status)
          .send({ message: error.message, ok: false });
        return;
      } else {
        response
          .status(500)
          .send({ message: "Error interno del servidor", ok: false });
      }
    }
  }

  async resendVerificationEmail(request, response) {
    try {
      const { email } = request.body;

      const user = await userRepository.findByEmail({ email });

      if (!user) {
        throw {
          status: 404,
          message: "Usuario no encontrado",
        };
      }

      if (user.verified) {
        throw {
          status: 400,
          message: "El usuario ya esta verificado",
        };
      }

      const verificaction_token = jwt.sign(
        { email: email },
        ENVIRONMENT.JWT_SECRET_KEY
      );
      await sendVerificationEmail({
        email,
        name: user.name,
        redirect_url: `http://localhost:3000/api/users/verify?verify_token=${verificaction_token}`,
      });

      response.send({
        ok: true,
        message: "Email reenviado con exito",
        status: 200,
      });
      return;
    } catch (error) {
      if (error.status) {
        response
          .status(error.status)
          .send({ message: error.message, ok: false });
        return;
      }
    }
  }
}

const userController = new UserController();

export default userController;
