import postCtrl from "../controllers/postController.js";
import { validRoles, verifyRoles } from "../middleware/auth.js";

const postRoutes = (fastify, opts, done) => {
    fastify.get("/", { preHandler: [verifyRoles([validRoles.admin])] }, postCtrl.getPosts);

    fastify.get("/getUserPost", { preHandler: [verifyRoles([validRoles.admin, validRoles.user])] }, postCtrl.getUserPost);

    fastify.get("/:id", { preHandler: [verifyRoles([validRoles.admin])] }, postCtrl.listOne);

    fastify.post("/addPost", { preHandler: [verifyRoles([validRoles.admin, validRoles.user])] }, postCtrl.addPost);

    fastify.put("/updatePost/:id", { preHandler: [verifyRoles([validRoles.admin])] }, postCtrl.updatePost);

    fastify.delete("/deletePost/:id", { preHandler: [verifyRoles([validRoles.admin])] }, postCtrl.deletePost);

    done();
};

export default postRoutes;