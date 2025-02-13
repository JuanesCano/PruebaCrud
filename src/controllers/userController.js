import { encryptPassword } from "../helpers/encryptPassword.js";
import { generateToken } from "../helpers/generateToken.js";
import { response } from "../helpers/response.js";
import { userModel } from "../models/userModel.js";

const userCtrl = {};

userCtrl.register = async (req, reply) => {
    try {
        const {email, name, password, salary, entry_date, role} = req.body;
        const user = await userModel.findOne({email});
        
        if(user){
            return response(reply, 400, false, "", "El correo ya se encuentra registrado por favor intenta con otro correo.");
        };

        const passwordEncrypt = encryptPassword(password);

        const newUser = new userModel({email, name, password: passwordEncrypt, salary, entry_date, role});

        await newUser.save();

        const token = generateToken({user: newUser._id});

        response(reply, 201, true, {...newUser._doc, token, password: null}, "Usuario creado correctamente");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};


userCtrl.login = async (req, reply) => {
    try {
       const {email, password} = req.body;
       const user = await userModel.findOne({email});
       
       if(user && user.matchPassword(password)){
        const token = generateToken({user: user._id});
        return response(reply, 200, true, {...user._doc, password: null, token}, "Bienvenido");
       }

       return response(reply, 400, false, "", "Correo o contraseña incorrectos, intente de nuevo.");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

export default userCtrl;