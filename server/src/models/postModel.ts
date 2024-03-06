import pool from "../db/connectDB.js";
import { Post } from "../types.js";
import { RequestError, createError } from "../helpers/error.js";

const getAll = async () => {
  const query = {
    text: "SELECT * FROM posts",
  };
  const res = await pool.query(query);
  return res.rows;
};

const create = async ({ titulo, img, descripcion }: Post) => {
  const query = {
    text: "INSERT INTO posts(titulo, img, descripcion) VALUES($1, $2, $3) RETURNING *",
    values: [titulo, img, descripcion],
  };
  if (!titulo || !img || !descripcion) {
    throw new RequestError(400, "You should enter all the fields");
  }
  const res = await pool.query(query);
  return res.rows[0];
};

const remove = async (id: string) => {
  const query = {
    text: `DELETE FROM posts WHERE id = $1 RETURNING *`,
    values: [id],
  };
  const res = await pool.query(query);

  if (res.rowCount === 0) {
    throw new RequestError(404, "This post does not exist");
  }

  return res.rows[0];
};

const addLike = async (id: string) => {
  const query = {
    text: "UPDATE posts SET likes = COALESCE(likes + $1, $1) WHERE id = $2 RETURNING *",
    values: [1, id],
  };
  const res = await pool.query(query);

  if (res.rowCount === 0) {
    throw new RequestError(404, "This post does not exist");
  }
  return res.rows[0];
};
export { getAll, create, remove, addLike };
