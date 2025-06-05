import ChannelMembers from "../models/ChannelsMembers.model.js";

class ChannelMembersRepository {
  async create({ channel_id, member_id, created_at }) {
    try {
      const channelMembers = new ChannelMembers({
        channel_id,
        member_id,
        created_at,
      });
      await channelMembers.save();
      console.log("ChannelMembers creado exitosamente! ");
    } catch (error) {
      console.error("Error !!!", error);
    }
  }
}
const channel_members = new ChannelMembersRepository();
export default channel_members;
