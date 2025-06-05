import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  workspace_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  private: {
    type: Boolean,
    required: true,
    default: false,
  },
});
const channel = mongoose.model("channel", channelSchema);
export default channel;
