import mongoose from "mongoose";
import channel_messages_repository from "../repositories/channels.messages.repository.js";

class ChannelMessagesService {
  async create({ user_id, channel_id, content }) {
    if (!content) {
      throw { status: 400, message: "El contenido no puede estar vacio" };
    }

    const castedUserId = new mongoose.Types.ObjectId(user_id);
    const castedChannelId = new mongoose.Types.ObjectId(channel_id);

    await channel_messages_repository.create({
      user_id: castedUserId,
      channel_id: castedChannelId,
      content,
    });

    const messages_list = await channel_messages_repository.getAllByChannelId(
      channel_id
    );
    return messages_list;
  }
  async getAllByChannel({ channel_id }) {
    const messages_list = await channel_messages_repository.getAllByChannelId(
      channel_id
    );
    return messages_list;
  }
}
const channel_messages_service = new ChannelMessagesService();
export default channel_messages_service;
