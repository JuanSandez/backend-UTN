import mongoose from "mongoose";
import ChannelMessage from "../models/ChannelsMessages.model.js";

class ChannelsMessagesRepository {
  async create({ channel_id, content, user_id }) {
    const channel_message = new ChannelMessage({
      channel_id: new mongoose.Types.ObjectId(channel_id),
      content,
      user_id: new mongoose.Types.ObjectId(user_id),
    });
    await channel_message.save();
    return channel_message;
  }

  async getAllByChannelId(channel_id) {
    const channel_messages = await ChannelMessage.find({
      channel_id: new mongoose.Types.ObjectId(channel_id),
    }).populate("user_id", "name");

    const channel_messages_formatted = channel_messages.map(
      (channel_message) => ({
        _id: channel_message._id,
        user: channel_message.user_id,
        content: channel_message.content,
        created_at: channel_message.created_at,
      })
    );

    return channel_messages_formatted;
  }
}
const channel_messages_repository = new ChannelsMessagesRepository();
export default channel_messages_repository;
