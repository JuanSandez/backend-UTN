import workspace_members_repository from "../repositories/workspace.members.repository.js";
import workspace_repository from "../repositories/workspace.repository.js";

const workspaceMiddleware = async (req, res, next) => {
  const workspaceId = req.params.workspace_id;
  const userId = req.user.id;
  try {
    console.log("workspaceId recibido:", workspaceId);
    const workspace = await workspace_repository.getById(workspaceId);
    if (!workspace) {
      throw { status: 404, message: "Workspace no encontradooo" };
    }
    const member =
      await workspace_members_repository.getMemberByWorkspaceIdAndUserId(
        workspaceId,
        userId
      );
    if (!member) {
      console.log("Miembro encontrado:", member);
      throw {
        status: 403,
        message: "El usuario no es miembro de este workspace",
      };
    }
    req.workspace = workspace;
    next();
  } catch (error) {
    const statusCode = error.status || 500;
    const message = error.message || "Error interno del servidor";
    res.status(statusCode).json({ message, status: statusCode, ok: false });
  }
};

export default workspaceMiddleware;
