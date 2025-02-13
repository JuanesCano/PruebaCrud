import postCtrl from "../controllers/postController.js";
import { verifyToken } from "../middleware/auth.js";

const middleware = (req, reply, done) => {
    verifyToken(req, reply, done);
};

const postRoutes = (fastify, opts, done) => {
    fastify.get("/", {preHandler: [middleware]}, postCtrl.getPosts);

    fastify.get("/:id", {preHandler: [middleware]}, postCtrl.listOne);

    fastify.post("/addPost", {preHandler: [middleware]}, postCtrl.addPost);

    fastify.put("/updatePost", {preHandler: [middleware]}, postCtrl.updatePost);

    fastify.delete("/deletePost", {preHandler: [middleware]}, postCtrl.deletePost);

    done();
};

export default postRoutes;