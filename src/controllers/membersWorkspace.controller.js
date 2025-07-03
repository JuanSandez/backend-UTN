import { response } from "express";
import workspace_members_repository from "../repositories/workspace.members.repository.js";
import workspace_repository from "../repositories/workspace.repository.js";
import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from "../dictionaries/availableRoles.dictionary.js";
import userRepository from "../repositories/users.repository.js";

class MembersWorkspaceController {
  async add(request, response) {
    try {
      const { id } = request.user;
      const { workspace_id } = request.params;
      const { role, email } = request.body;
      if (!Object.values(AVAILABLE_ROLES_WORKSPACE_MEMBERS).includes(role)) {
        throw {
          status: 400,
          message: "Role no valido",
        };
      }

      const user_found = await userRepository.findByEmail({ email });
      if (!user_found) {
        throw { status: 404, message: "Usuario no encontrado" };
      }
      const members = await workspace_members_repository.getAllByWorkspaceId(
        workspace_id
      );

      if (
        members.find((member) => {
          return member.user_id.equals(user_found._id);
        })
      ) {
        throw {
          message: "El usuario ya es miembro de este workspace",
          status: 400,
        };
      }

      const workspace_found = await workspace_repository.getById(workspace_id);
      if (!workspace_found) {
        throw { status: 404, message: "Workspace no existe" };
      }
      if (!workspace_found.owner_id.equals(id)) {
        throw {
          status: 403,
          message: "No puedes hacer esta accion, no eres dueño del workspace",
        };
      }

      await workspace_members_repository.create({
        user_id: user_found._id,
        workspace_id: workspace_id,
        role: role,
      });
      response.status(201).json({
        ok: true,
        status: 201,
        message: "Miembro añadido exitosamente",
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
}
const members_workspace_controller = new MembersWorkspaceController();
export default members_workspace_controller;
