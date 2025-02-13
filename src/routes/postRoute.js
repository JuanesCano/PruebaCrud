import postCtrl from "../controllers/postController.js";
import { validRoles, verifyRoles, verifyToken } from "../middleware/auth.js";

const middleware = (req, reply, done) => {
    verifyToken(req, reply, done);
};

const postRoutes = (fastify, opts, done) => {
    fastify.get("/", {preHandler: [verifyToken,  verifyRoles([validRoles.admin])]}, postCtrl.getPosts);

    fastify.get("/:id", {preHandler: [verifyToken, verifyRoles([validRoles.admin])]}, postCtrl.listOne);

    fastify.post("/addPost", {preHandler: [verifyToken, verifyRoles([validRoles.admin, validRoles.user])]}, postCtrl.addPost);

    fastify.put("/updatePost", {preHandler: [verifyToken, verifyRoles([validRoles.admin])]}, postCtrl.updatePost);

    fastify.delete("/deletePost", {preHandler: [verifyToken, verifyRoles([validRoles.admin])]}, postCtrl.deletePost);

    done();
};

export default postRoutes;