import { Response, Request, NextFunction } from "express";

interface Post {
  id?: number;
  titulo: string;
  [key: string]: string;
  descripcion: string;
  likes?: number;
}

type ControllerType = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void> | any;

interface PostgresCodes {
  [key: string]: string;
}

interface IRequestError {
  statusCode: number;
  message: string;
  checkCode: (code: string) => void;
}
type Middleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void | Promise<void>;

export { Post, ControllerType, PostgresCodes, IRequestError, Middleware };
