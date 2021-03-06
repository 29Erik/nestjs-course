import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: String,
    default: false,
  },
});
