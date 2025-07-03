import Workspace from "../models/Workspaces.model.js";

class WorkspacesRepository {
  async create({ name, description, owner_id }) {
    const workspace = new Workspace({
      name,
      owner_id,
      description,
    });
    await workspace.save();
    return workspace;
  }
  async deleteWorkspacesFromOwner(owner_id, workspace_id) {
    const result = await Workspace.findOneAndDelete({
      owner_id,
      _id: workspace_id,
    });

    if (!result) {
      throw { status: 404, message: "El workspace a eliminar no existe" };
    }
  }

  async deleteById(workspace_id) {
    return await Workspace.findOneAndDelete({ _id: workspace_id });
  }

  async getById(workspace_id) {
    return await Workspace.findById(workspace_id);
  }
}
const workspace_repository = new WorkspacesRepository();
export default workspace_repository;
