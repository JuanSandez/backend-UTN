import WorkspaceMember from "../models/WorkspaceMembers.model.js";

class WorkspaceMembersRepository {
  async create({ workspace_id, user_id, role, created_at }) {
    try {
      const workspaceMember = new WorkspaceMember({
        workspace_id,
        user_id,
        role,
        created_at,
      });
      await workspaceMember.save();
      console.log("Workspace members ha sido creado exitosamente! ");
    } catch (error) {
      console.error("Error !!!", error);
    }
  }
}
const workspace_members = new WorkspaceMembersRepository();
export default workspace_members;
