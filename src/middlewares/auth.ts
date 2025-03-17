import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";
import { User } from "../models/User";
import { SECRET_KEY } from "..";

export const authenticateToken = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<any> => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response.status(401).json({ message: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as { id: string; username: string };
    const user = await User.findOne({ identification: decoded.id });

    if (!user) {
      return response.status(403).json({ message: "Usuário não encontrado" });
    }

    (request as any).user = user;
    next();
  } catch (error) {
    return response.status(403).json({ message: "Token inválido" });
  }
};