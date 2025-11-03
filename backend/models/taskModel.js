const pool = require('../config/db');

async function createTask({ user_id, title, description, status, deadline }) {
  const [result] = await pool.query(
    'INSERT INTO tasks (user_id, title, description, status, deadline) VALUES (?, ?, ?, ?, ?)',
    [user_id, title, description, status, deadline || null]
  );
  return { id: result.insertId, user_id, title, description, status, deadline };
}

async function getTasksByUser(user_id) {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [user_id]);
  return rows;
}

async function getTaskById(id) {
  const [rows] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
  return rows[0];
}

async function updateTask(id, { title, description, status, deadline }) {
  await pool.query('UPDATE tasks SET title = ?, description = ?, status = ?, deadline = ? WHERE id = ?', [title, description, status, deadline || null, id]);
  return getTaskById(id);
}

async function deleteTask(id) {
  const [result] = await pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  return result.affectedRows > 0;
}

module.exports = {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
};
