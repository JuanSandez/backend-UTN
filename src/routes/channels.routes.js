import express from "express";
import channel_controller from "../controllers/channel.controller.js";
import authorizationMiddleware from "../middlewares/auth.middleware.js";
import workspaceMiddleware from "../middlewares/workspace.middleware.js";

const channelRouter = express.Router();
channelRouter.post(
  "/:workspace_id",
  authorizationMiddleware,
  workspaceMiddleware,
  channel_controller.create
);
channelRouter.get(
  "/:workspace_id",
  authorizationMiddleware,
  workspaceMiddleware,
  channel_controller.getAllByWorkspaceId
);
channelRouter.delete(
  "/:workspace_id/:channel_id",
  authorizationMiddleware,
  workspaceMiddleware,
  channel_controller.delete
);

export default channelRouter;
