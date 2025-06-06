import mongoose from "mongoose"


const workspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String
    },
    owner_id: {
        type: mongoose.Schema.Types.ObjectId, // Esto valida que el type sea ObjectId
        ref: 'User', 
        required: true
    },
    created_at: {
        type: Date,
        default: new Date()
    }
})

const Workspace = mongoose.model('Workspaces', workspaceSchema)
export default Workspace
