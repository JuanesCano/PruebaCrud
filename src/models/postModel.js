import mongoose from "mongoose";
const {Schema, model} = mongoose;
import { v4 as uuidv4 } from 'uuid';

const postSchema = new Schema({
    id: {
        type: String,
        default: uuidv4
    },
    
    title: {
        type: String,
        required: [true, "El campo title es requerido"]
    },

    description: {
        type: String,
        required: [true, "El campo description es requerido"]
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "user"
    }
},
{
    timestamps: true
});

export const postModel = model("post", postSchema);