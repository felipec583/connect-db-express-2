import {
  getAllPosts,
  addPost,
  removePost,
  incrementLikePost,
} from "../controllers/postController.js";
import express from "express";

const route = express.Router();

route.get("/", getAllPosts);
route.post("/", addPost);
route.delete("/:id", removePost);
route.put("/like/:id", incrementLikePost);
export default route;
