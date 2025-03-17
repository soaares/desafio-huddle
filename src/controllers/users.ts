import jwt from "jsonwebtoken"

import { v4 as uuidv4 } from "uuid"
import { Request, Response } from "express"
import { User } from "../models/User";
import { SECRET_KEY } from "..";

export const login = async (req: Request, res: Response): Promise<any> => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Usuário não encontrado" });
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Senha inválida" });
    }

    const token = jwt.sign({ id: user.identification, username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor" });
  }
}

export const signup = async (request: Request, response: Response): Promise<any> => {
    const { username, password } = request.body;
  
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return response.status(400).json({ message: "Usuário já existe" });
      }
  
      const identification = uuidv4()
  
      const user = new User({ username, password, identification });
      await user.save();
  
      response.status(201).json({ id: user.identification, username: user.username });
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: "Erro no servidor" });
    }
  }