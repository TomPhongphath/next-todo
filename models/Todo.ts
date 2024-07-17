import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

export default mongoose.models.Todo || mongoose.model('Todo', TodoSchema);
