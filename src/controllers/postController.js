import { response } from "../helpers/response.js";
import { postModel } from "../models/postModel.js";

const postCtrl = {};

postCtrl.getPosts = async (req, reply) => {
    try {
        const post = await postModel.find().populate("user", "name email").sort({ createdAt: -1 });
        response(reply, 200, true, post, "Posts obtenidos correctamente");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

postCtrl.listOne = async (req, reply) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id).populate("user", "name email").sort({ createdAt: -1 });

        if (!post) {
            response(reply, 404, false, "", "Post no encontrado");
        };

        return response(reply, 200, true, post, "Post obtenido correctamente");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

postCtrl.getUserPost = async (req, reply) => {
    try {
        const userId = req.user._id;
        const posts = await postModel.find({user: userId}).populate("user", "name email").sort({ createdAt: -1 });
        response(reply, 200, true, posts, "Posts del usuario obtenidos correctamente");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
}

postCtrl.addPost = async (req, reply) => {
    try {
        if(!req.user){
            response(reply, 401, false, "", "El usuario no existe")
        }
        const { title, description } = req.body;
        const newPost = new postModel({ title, description, user: req.user._id });

        await newPost.save();

        const populatePost = await postModel.findById(newPost._id).populate("user", "name email");

        response(reply, 201, true, populatePost, "Post creado correctamente");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

postCtrl.updatePost = async (req, reply) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if (!post) {
            response(reply, 404, false, "", "Post no encontrado");
        };

        await post.updateOne(req.body);
        response(reply, 200, true, "", "Post actualizado");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

postCtrl.deletePost = async (req, reply) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if (!post) {
            response(reply, 404, false, "", "Post no encontrado");
        };

        await post.deleteOne();
        return response(reply, 200, true, "", "Post eliminado");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

export default postCtrl;