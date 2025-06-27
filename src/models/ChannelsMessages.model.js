import mongoose, { Schema } from "mongoose";

const channelMessageSchema = new Schema({
  channel_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Channel",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  content: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const ChannelMessage = mongoose.model("channel_message", channelMessageSchema);
export default ChannelMessage;
