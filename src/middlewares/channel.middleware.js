import channel_repository from "../repositories/channel.repository.js";

const channelMiddleware = async (req, res, next) => {
  const { channel_id } = req.params;
  const workspace = req.workspace;

  try {
    const channel = await channel_repository.findById(channel_id);
    if (!channel) {
      throw { status: 404, message: "Canal no encontrado" };
    }
    if (channel.workspace_id.toString() !== workspace._id.toString()) {
      throw { status: 403, message: "Canal no encontrado" };
    }
    req.channel = channel;
    req.channel_id = channel_id;
    next();
  } catch (error) {
    if (error.status) {
      res.status(error.status).send({
        message: error.message,
        ok: false,
      });
      return;
    } else {
      console.log("Hubo un error", error);
      res
        .status(500)
        .send({ message: "Error interno del servidor", ok: false });
    }
  }
};

export default channelMiddleware;
