import { Schema, model, Document } from 'mongoose';

enum Status {
    todo = "todo",
    doing = "doing",
    done = "done"
}

export interface ITask extends Document {
  identification: string;
  title: string;
  description: string;
  owner: string;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    identification: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    owner: { type: String, required: true },
    status: { type: String, required: true, default: Status.todo }
  },
  { timestamps: true }
);

// Modelo do usuário
const Task = model<ITask>('Task', taskSchema);

export default Task;