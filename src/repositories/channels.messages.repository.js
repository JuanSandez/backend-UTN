import ChannelMessage from "../models/ChannelsMessages.model.js";



class ChannelsMessagesRepository {
  async create({ member_channel_id, channel_id, content, created_at }) {
    try {
      const channelMessage = new ChannelMessage({
        member_channel_id,
        channel_id,
        content,
        created_at,
      });
      await channelMessage.save();
      console.log("Channels messages ha sido creado exitosamente! ");
    } catch (error) {
      console.error("Error !!!", error);
    }
  }
}
const channel_messages = new ChannelsMessagesRepository();
export default channel_messages;
