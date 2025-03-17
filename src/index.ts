
import dotenv from "dotenv";
import connectDB from "./config/db";

import express, { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { authenticateToken } from "./middlewares/auth";
import { 
  login as loginController, 
  signup as signupController 
} from "./controllers/users"
import { 
  getAllTasks as getAllTasksController, 
  getTaskById as getTaskByIdController,
  createTask as createTaskController,
  deleteTaskById as deleteTaskByIdController,
  updateTask as updateTaskController 
} from "./controllers/tasks";

dotenv.config()

export const SECRET_KEY = process.env.SECRET_KEY || uuidv4()
const PORT = process.env.PORT

const app = express()
app.use(express.json())

connectDB()

app.get('/', (request: Request, response: Response) => {
  response.status(200).json({"message": "Hello World"})
})

app.post('/login', loginController);
app.post('/signup', signupController);

app.get('/tasks', authenticateToken, getAllTasksController)
app.get('/tasks/:taskId', authenticateToken, getTaskByIdController)
app.post('/tasks', authenticateToken, createTaskController)
app.put('/tasks/:taskId', authenticateToken, updateTaskController)
app.delete('/tasks/:taskId', authenticateToken, deleteTaskByIdController)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`)
})