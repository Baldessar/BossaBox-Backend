import mongoose from "mongoose"
const Schema = mongoose.Schema;

const toolsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
        required: true
    }

});

const tools = mongoose.model('tools', toolsSchema);

export default tools