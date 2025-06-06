import Channel from "../models/Channel.model.js";

class ChannelRepository {
  async create({ name, workspace_id, created_at, isPrivate }) {
    try {
      const channel = new Channel({
        name,
        workspace_id,
        created_at,
        private: isPrivate,
      });
      await channel.save();
      console.log("Channel creado exitosamente! ");
    } catch (error) {
      console.error("Error !!!", error);
    }
  }
}
const channel_repository = new ChannelRepository();
export default channel_repository;
