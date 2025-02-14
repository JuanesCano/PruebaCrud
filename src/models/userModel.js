import mongoose from "mongoose";
const {Schema, model} = mongoose;
import bcrypt from 'bcrypt';

const userSchema = new Schema ({
    name: {
        type: String,
        required: [true, "El campo name es requerido"]
    },
    
    entry_date: {
        type: String, 
        required: [true, "El campo entry_date es requerido"],
    },

    salary:{
        type: Number,
        required: [true, "El campo salary es requerido"]
    },

    email: {
        type: String, 
        required: [true, "El campo email es requerido"],
        unique: true
    },

    password: {
        type: String,
        required: [true, "El campo password es requerido"]
    },

    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    }
},
{
    timestamps: true
});

userSchema.methods.matchPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

export const userModel = model("user", userSchema);