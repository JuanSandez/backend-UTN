import mongoose from "mongoose";
import Channel from "../models/Channel.model.js";

class ChannelRepository {
  async create({ name, workspace_id, isPrivate }) {
    try {
      const channel = new Channel({
        name,
        workspace_id,
        private: isPrivate,
      });
      await channel.save();
      console.log("Channel creado exitosamente! ");
      return channel;
    } catch (error) {
      throw error;
    }
  }

  async findByName(name, workspaceId) {
    try {
      const channel = await Channel.findOne({
        name,
        workspace_id: workspaceId,
      });
      return channel;
    } catch (error) {
      throw error;
    }
  }
  async findById(id) {
    try {
      const channel = await Channel.findById(id);
      return channel;
    } catch (error) {
      throw error;
    }
  }

  async getAllByWorkspace(workspaceId) {
    try {
      const channels = await Channel.find({ workspace_id: workspaceId });
      return channels;
    } catch (error) {
      throw error;
    }
  }

  async deleteById(channelId, workspaceId) {
    return await Channel.findOneAndDelete({
      _id: channelId,
      workspace_id: workspaceId,
    });
  }
}

const channel_repository = new ChannelRepository();
export default channel_repository;
