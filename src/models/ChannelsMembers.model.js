import mongoose from "mongoose";

const channelMembersSchema = new mongoose.Schema({
  channel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  member_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});
const channelMembers = mongoose.model("channel_members", channelMembersSchema);
export default channelMembers;
