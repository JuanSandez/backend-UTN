import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/availableRoles.dictionary.js";
import workspace_members_repository from "../repositories/workspace.members.repository.js";
import workspace_repository from "../repositories/workspace.repository.js";

class WorkspaceController {
  async create(request, response) {
    try {
      const { name, description } = request.body;
      const { id } = request.user; // Este id es del usuario que hace la consulta

      const workspace_created = await workspace_repository.create({ name, description, owner_id: id });
      await workspace_members_repository.create({
        workspace_id: workspace_created._id,
        user_id: id,
        role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN

      })



      response.status(201).json({
        ok: true,
        message: "Workspace creado exitosamente",
        status: 201,
        data: {},
      });
    } catch (error) {
      if (error.status) {
        response.status(error.status).json({
          message: error.message,
          status: error.status,
          ok: false,
        });
        return;
      } else {
        console.log("Hubo un error", error);
        response
          .status(500)
          .json({ message: "Error interno del servidor", ok: false });
      }
    }
  }

  async delete(request, response) {
    try {
      const workspace_id = request.params.workspace_id;
      const user_id = request.user.id;
      await workspace_repository.deleteWorkspacesFromOwner(
        user_id,
        workspace_id
      );

      response.status(200).json({
        ok: true,
        message: "Workspace eliminado",
        status: 200,
        data: {},
      });
      return;
    } catch (error) {
      if (error.status) {
        response.status(error.status).send({
          status: error.message,
          message: error.status,
          ok: false,
        });
        return;
      } else {
        console.log("Hubo un error", error);
        response.status(500).json({
          message: "error inerno del servidor",
          ok: false,
        });
      }
    }
  }
  async getAllByMember(request, response){
    const {id} = request.user
    const workspaces = await workspace_members_repository.getAllByUserId(id)
    response.json({
      ok: true,
      status: 200,
      message: "Lista de workspaces",
      data: {
        workspaces: workspaces
      }
      
    })
  }
}

const workspace_controller = new WorkspaceController();
export default workspace_controller;
