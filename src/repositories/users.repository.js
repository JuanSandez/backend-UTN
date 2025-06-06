import User from "../models/User.model.js";

class UserRepository {
  async create({ name, password, email }) {
    const user = new User({ name, password, email });
    await user.save();
    console.log("Usuario creado exitosamente! ");
  }

  async findByEmail({ email }) {
    return await User.findOne({ email: email });
  }

  async verifyUserEmail({ email }) {
    const userFound = await this.findByEmail({ email });

    console.log({ userFound });

    if (userFound.verified) {
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

          new: true,
        }
      );
      console.log({ result });
    }
  }
}

const userRepository = new UserRepository();

export default userRepository;
