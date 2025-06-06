import User from "../models/User.model.js";

//El patrón de repositorio sirve como una capa intermedia entre la lógica de tu aplicación (por ejemplo, rutas,
// controladores, servicios) y la base de datos. Esto tiene varias ventajas:

class UserRepository {
  async create({ name, password, email }) {
    const user = new User({ name, password, email });
    await user.save();
    console.log("Usuario creado exitosamente! ");
  }

  // Busca en la base de datos un usuario con el email recibido.
  // Si el usuario ya está verificado, lanza un error personalizado.
  // Si no está verificado, actualiza el campo verified a true usando findByIdAndUpdate, lo que:
  // Cambia el campo verified a true.
  // Aplica validaciones (runValidators: true).
  // Devuelve el documento actualizado (new: true).
  // Muestra por consola el resultado de la actualización.

  async findByEmail({ email }) {
    //.find es un filter de js
    //.findOne es un find de js
    return await User.findOne({ email: email });
  }

  async verifyUserEmail({ email }) {
    const userFound = await this.findByEmail({ email }); //Filtramos a todos los usuarios que cumplan con la condicion

    console.log({ userFound });

    if (userFound.verified) {
      //Throw lo uso para lanzar mi propio error y terminar con el hilo de ejecucion
      throw { status: 400, message: "Usuario ya validado" };
    } else {
      const result = await User.findByIdAndUpdate(
        userFound._id,
        {
          $set: {
            verified: true,
          },
        },
        {
          runValidators: true,
          new: true, // Cuando se ejecute el update nos actualice el retorno, es decir, cuando se hace click, de false pasa a true
        }
      );
      console.log({ result });
    }
  }
}

// const userRepository = new userRepository()
const userRepository = new UserRepository();

export default userRepository;
