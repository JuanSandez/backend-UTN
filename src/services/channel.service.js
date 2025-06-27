import channel_repository from "../repositories/channel.repository.js";
import workspace_repository from "../repositories/workspace.repository.js";


class ChannelService {
    async create(workspaceId, name ) {
        try {
            if(typeof name !== 'string' || name.length >= 12){
                throw { status: 400, message: "El nombre del canal tiene que tener menos de 12 caracteres "}
            }
            const existingChannel = await channel_repository.findByName(name, workspaceId)
            if(existingChannel){
                throw { status: 400, message: "El nombre del canal ya esta en uso "}
            }

            const default_is_private = false
            await channel_repository.create({name,
  workspace_id: workspaceId,
  isPrivate: default_is_private
});
            const channels = await channel_repository.getAllByWorkspace(workspaceId);
            return {
                channels
            };
            
            
            // const channel = await channel_repository.create({ name, workspace_id: workspaceId, isPrivate: false 
            // })
            // await channel_repository.getAllByWorkspace(workspaceId)
            // return {
            //     channel
            // }
        } catch (error) {
            throw error
        }
    }

    async getAllByWorkspaceId(workspace_id) {
        return await channel_repository.getAllByWorkspace(workspace_id)
    }
}

const channel_service = new ChannelService();
export default channel_service