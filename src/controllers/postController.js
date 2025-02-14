import { response } from "../helpers/response.js";
import { postModel } from "../models/postModel.js";

const postCtrl = {};

postCtrl.getPosts = async (req, reply) => {
    try {
        const post = await postModel.find().populate({path: "user", select: "name id"}).sort({createdAt: -1});
        response(reply, 200, true, post, "Posts obtenidos correctamente");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

postCtrl.listOne = async (req, reply) => {
    try {
        const {id} = req.params; 
        const post = await postModel.findById(id);

        if(!post){
            response(reply, 404, false, "", "Post no encontrado");
        };

        return response(reply, 200, true, post, "Post obtenido correctamente");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

postCtrl.addPost = async (req, reply) => {
    try {
        const {title, description} = req.body;
        const newPost = new postModel ({title, description, user: req.userId});
        
        await newPost.save();
        response(reply, 201, true, newPost, "Post creado correctamente");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

postCtrl.updatePost = async (req, reply) => {
    try {
        const { id } = req.params;
        const post = await postModel.findById(id);

        if(!post){
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

        if(!post){
            response(reply, 404, false, "", "Post no encontrado");
        };

        await post.deleteOne();
        return response(reply, 200, true, "", "Post eliminado");
    } catch (error) {
        response(reply, 500, false, "", error.message);
    }
};

export default postCtrl;