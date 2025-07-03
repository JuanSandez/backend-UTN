import express from "express";
import authorizationMiddleware from "../middlewares/auth.middleware.js";
import members_workspace_controller from "../controllers/membersWorkspace.controller.js";

const memberWorkspaceRouter = express.Router();

memberWorkspaceRouter.post(
  "/:workspace_id",
  authorizationMiddleware,
  members_workspace_controller.add
);

export default memberWorkspaceRouter;
