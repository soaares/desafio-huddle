import Task from "../models/Task"
import { Request, Response } from "express"
import { v4 as uuidv4 } from "uuid"

export const getAllTasks = async (request: Request, response: Response): Promise<void> => {
    const { user } = (request as any)

    try {
      const tasks = await Task.find().select("-_id -__v").where({ owner: user.identification })
      response.status(200).json({ tasks: tasks, username: user.username })
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: "Server error" });
    }
}

export const getTaskById = async (request: Request, response: Response): Promise<void> => {
    const { taskId } = request.params
    const { user } = (request as any)

    try {
      const task = await Task.findOne().select("-_id -__v").where({ identification: taskId, owner: user.identification })
      response.status(200).json({ task: task })
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: "Server error" });
    }
}

export const createTask = async (request: Request, response: Response): Promise<void> => {
    const { title, description } = request.body
    const { user } = (request as any)

    const task = new Task({
      title,
      description,
      identification: uuidv4(),
      owner: user.identification
    })

    try {
      await task.save()
      response.status(201).json({ message: "Saved successfully", task: { 
        id: task.identification, 
        title: task.title, 
        owner: task.owner, 
        status: task.status,
        createdAt: task.createdAt 
    }})
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: "Failed to save a new task" });
    }
}

export const updateTask = async (request: Request, response: Response): Promise<void> => {
    const { title, description, status } = request.body
    const { taskId } = request.params
    const { user } = (request as any)

    try {
        const taskUpdated = await Task.findOne({ identification: taskId, owner: user.identification }).select("identification title description owner status createdAt updatedAt")
        if (!taskUpdated) {
            response.status(201).json({ message: "Task not found" })
            return
        }
        
        if (title) taskUpdated.title = title
        if (description) taskUpdated.description = description
        if (status) taskUpdated.status = status

        await taskUpdated.save()
        response.status(200).json({ message: "Task updated successfully", task: { 
            id: taskUpdated.identification, 
            title: taskUpdated.title, 
            owner: taskUpdated.owner, 
            status: taskUpdated.status,
            createdAt: taskUpdated.createdAt,
            updatedAt: taskUpdated.updatedAt } })
    } catch (error) {
        response.status(500).json({ message: "Problems when trying to find a task" })
    }
}

export const deleteTaskById = async (request: Request, response: Response): Promise<void> => {
    const { taskId } = request.params
    const { user } = (request as any)

    try {
      await Task.deleteOne({ identification: taskId, owner: user.identification })
      response.status(200).json({"message": `Task: ${taskId} successfully deleted.`})
    } catch (error) {
      console.log(error)
      response.status(500).json({ message: "Failed to delete a task" });
    }
}