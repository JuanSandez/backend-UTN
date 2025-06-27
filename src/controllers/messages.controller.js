import channel_messages_service from "../services/channelMessages.service.js";

class MessagesController {
  async create(request, response) {
    try {
      const messages_list = await channel_messages_service.create({
        user_id: request.user.id,
        channel_id: request.channel_id,
        content: request.body.content,
      });
      response.json({
        ok: true,
        status: 201,
        data: {
          messages: messages_list,
        },
        message: "Mensajes creado exitosamente",
      });
    } catch (error) {
      if (error.status) {
        response.status(error.status).send({
          message: error.message,
          ok: false,
        });
        return;
      } else {
        response
          .status(500)
          .send({ message: "Error interno del servidor", ok: false });
      }
    }
  }

  async getAllByChannel(request, response) {
    try {
      const { channel_id } = request.params;
      const messages_list = await channel_messages_service.getAllByChannel({
        channel_id: channel_id,
      });

      response.json({
        ok: true,
        status: 200,
        message: "Mensajes obtenidos exitosamente",
        data: {
          messages: messages_list,
        },
      });
    } catch (error) {
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
}
const messages_controller = new MessagesController();
export default messages_controller;
