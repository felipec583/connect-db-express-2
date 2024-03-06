import { RequestError, createError } from "../helpers/error.js";
import * as postModel from "../models/postModel.js";
import { ControllerType } from "../types.js";

const getAllPosts: ControllerType = async (req, res, next) => {
  try {
    const posts = await postModel.getAll();
    if (!posts) {
      throw new RequestError(404, "Not found");
    }
    res.status(200).json(posts);
  } catch (error: any) {
    error.statusCode
      ? res.status(error.statusCode).send(error.message)
      : res.status(500).json({ message: "Internal server error" });
  }
};

const addPost: ControllerType = async (req, res, next) => {
  try {
    const newPostData = req.body;
    const posts = await postModel.getAll();
    if (
      posts.some(
        (v) => v.titulo.toLowerCase() === newPostData.titulo.toLowerCase()
      )
    ) {
      throw new RequestError(409, "This title already exists");
    }
    const newPost = await postModel.create(newPostData);
    res.status(200).json(newPost);
    console.log("Added");
  } catch (error: any) {
    error.statusCode
      ? res.status(error.statusCode).send(error.message)
      : res.status(500).json({ message: "Internal server error" });
  }
};

const removePost: ControllerType = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      throw new RequestError(404, "This id does not exist");
    }
    const deletedPost = await postModel.remove(id);
    res.status(204).send("Post deleted");
    console.log(`POST WITH ID:${id} has been deleted`);
  } catch (error: any) {
    const { code } = error;
    if (error instanceof RequestError) {
      return res.status(error.statusCode).send(error.message);
    }
    const newError = createError(500, "Internal server error", code);

    res.status(newError.statusCode).json({ message: newError.message });
  }
};

const incrementLikePost: ControllerType = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.sendStatus(404);
      return;
    }
    const editedPost = await postModel.addLike(id);
    res.status(201).send("Se ha agregado un like");
  } catch (error) {
    console.log(error);
  }
};

export { getAllPosts, addPost, removePost, incrementLikePost };
