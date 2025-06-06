import mongoose, { Schema } from "mongoose";

const channelMessageSchema = new Schema({
  member_channel_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "members_channel",
  },
  channel_id: {
    type: Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const ChannelMessage = mongoose.model("channel_message", channelMessageSchema);
export default ChannelMessage;
