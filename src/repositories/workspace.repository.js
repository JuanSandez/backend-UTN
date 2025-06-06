import Workspace from "../models/Workspaces.model.js"

class WorkspacesRepository {
    async create({ name, description, owner_id, created_at}) {
        try{
            const workspace = new Workspace({
                name,
                owner_id,
                description,
                created_at
            })
            await workspace.save()
            console.log("Workspace creado exitosamente! ")
        }
        catch(error){
            console.error("Error !!!", error)
        }
    }
}
const workspace_repository = new WorkspacesRepository()
export default workspace_repository;