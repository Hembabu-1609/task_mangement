const taskModel = require('../models/taskModel');

async function getTasks(req, res) {
  const tasks = await taskModel.getTasksByUser(req.user.id);
  res.json(tasks);
}

async function createTask(req, res) {
  const { title, description, status, deadline } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });
  const task = await taskModel.createTask({ user_id: req.user.id, title, description, status, deadline });
  res.status(201).json(task);
}

async function updateTask(req, res) {
  const { id } = req.params;
  const existing = await taskModel.getTaskById(id);
  if (!existing || existing.user_id !== req.user.id) return res.status(404).json({ message: 'Task not found' });

  const updated = await taskModel.updateTask(id, req.body);
  res.json(updated);
}

async function deleteTask(req, res) {
  const { id } = req.params;
  const existing = await taskModel.getTaskById(id);
  if (!existing || existing.user_id !== req.user.id) return res.status(404).json({ message: 'Task not found' });

  const ok = await taskModel.deleteTask(id);
  if (ok) return res.json({ message: 'Deleted' });
  res.status(500).json({ message: 'Failed to delete' });
}

module.exports = { getTasks, createTask, updateTask, deleteTask };
