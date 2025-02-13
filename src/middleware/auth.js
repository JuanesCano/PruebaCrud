import jwt from "jsonwebtoken";
import { response } from "../helpers/response.js"
import { userModel } from "../models/userModel.js";

export const validRoles = { admin: "admin", user: "user" }

const messageNoAuth = (reply) => {
    return response(reply, 401, false, "", "No estas autorizado")
};

const messageAuthRole = (reply) => {
    return response(reply, 400, false, "", "No tienes rol para realizar esta accion")
}

export const verifyToken = async (req, reply) => {
    let token = null;
    const roles = req.validRoles;

    if (!roles || roles.length === 0) {
        return messageNoAuth(reply);
    }

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.SECRET_JWT, async (err, payload) => {
            if (err) {
                return messageNoAuth(reply);
            }

            const user = await userModel.findById({ _id: payload.user });
            if (!user) {
                return messageNoAuth(reply);
            }

            if (roles.includes(user.role)) {
                req.user = user;
                return
            } else {
                return messageAuthRole(reply);
            }
        });
    } else {
        return messageNoAuth(reply);
    }

    if (!token) {
        return messageNoAuth(reply);
    }
};

export const verifyRoles = (roles) => {
    return async (req, reply) => {
        req.validRoles = roles;
        await verifyToken(req, reply);
    };
};