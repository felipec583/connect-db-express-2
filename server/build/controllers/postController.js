import { RequestError, createError } from "../helpers/error.js";
import * as postModel from "../models/postModel.js";
const getAllPosts = async (_req, res, _next) => {
    try {
        const posts = await postModel.getAll();
        if (!posts) {
            throw new RequestError(404, "Not found");
        }
        res.status(200).json(posts);
    }
    catch (error) {
        /* Si el error atrapa un statusCode de la instancia
        del RequestError, mandará el primer response,
        sino un status 500  */
        error.statusCode
            ? res.status(error.statusCode).send(error.message)
            : res.status(500).json({ message: "Internal server error" });
    }
};
const addPost = async (req, res, _next) => {
    try {
        const newPostData = req.body;
        const posts = await postModel.getAll();
        if (posts.some((v) => v.titulo.toLowerCase() === newPostData.titulo.toLowerCase())) {
            throw new RequestError(409, "This title already exists");
        }
        const newPost = await postModel.create(newPostData);
        res.status(200).json(newPost);
        console.log("Added");
    }
    catch (error) {
        error.statusCode
            ? res.status(error.statusCode).send(error.message)
            : res.status(500).json({ message: "Internal server error" });
    }
};
const removePost = async (req, res, _next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new RequestError(404, "This id does not exist");
        }
        const deletedPost = await postModel.remove(id);
        res.status(200).json({ "Post deleted": deletedPost });
        console.log(`POST WITH ID:${id} has been deleted`);
    }
    catch (error) {
        const { code } = error;
        if (error instanceof RequestError) {
            return res.status(error.statusCode).send(error.message);
        }
        const newError = createError(500, "Internal server error", code);
        res.status(newError.statusCode).json({ message: newError.message });
    }
};
const incrementLikePost = async (req, res, _next) => {
    try {
        const { id } = req.params;
        if (!id) {
            throw new RequestError(400, "Bad request");
        }
        await postModel.addLike(id);
        res.status(201).send("Se ha agregado un like");
    }
    catch (error) {
        error.statusCode
            ? res.status(error.statusCode).send(error.message)
            : res.status(500).json({ message: "Internal server error" });
    }
};
export { getAllPosts, addPost, removePost, incrementLikePost };
