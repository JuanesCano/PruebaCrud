import mongoose from "mongoose";
const {Schema, model} = mongoose;

const postSchema = new Schema({
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