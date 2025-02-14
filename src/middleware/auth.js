import jwt from "jsonwebtoken";
import { response } from "../helpers/response.js";
import { userModel } from "../models/userModel.js";

export const validRoles = { admin: "admin", user: "user" };

const messageNoAuth = (reply) => {
    return response(reply, 401, false, "", "No estás autorizado");
};

const messageAuthRole = (reply) => {
    return response(reply, 403, false, "", "No tienes el rol para realizar esta acción");
};

export const verifyToken = async (req, reply) => {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return messageNoAuth(reply);
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT);
        const user = await userModel.findById(payload.user);

        if (!user) {
            return messageNoAuth(reply);
        }

        req.user = user;
    } catch (err) {
        return messageNoAuth(reply);
    }
};

export const verifyRoles = (roles) => {
    return async (req, reply) => {
        await verifyToken(req, reply);
        if (!req.user) return;

        if (!roles.includes(req.user.role)) {
            return messageAuthRole(reply);
        }
    };
};