const express = require("express");
const router = express.Router();
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");


router.use(authMiddleware);

router.get("/", (req, res) => {
  const userId = req.user.id;
  const sql = "SELECT * FROM tasks WHERE user_id = ?";
  db.query(sql, [userId], (err, result) => {
    if (err) {
      console.error("Error fetching tasks:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { title, description, status, deadline } = req.body;
  const userId = req.user.id;

  if (!title) return res.status(400).json({ message: "Title is required" });

  const sql = `
    INSERT INTO tasks (title, description, status, deadline, user_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  db.query(sql, [title, description, status || "Pending", deadline || null, userId], (err, result) => {
    if (err) {
      console.error("Error adding task:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({
      id: result.insertId,
      title,
      description,
      status: status || "Pending",
      deadline,
      user_id: userId,
    });
  });
});

router.put("/:id", (req, res) => {
  const { title, description, status, deadline } = req.body;
  const { id } = req.params;
  const userId = req.user.id;

  const sql = `
    UPDATE tasks
    SET title=?, description=?, status=?, deadline=?
    WHERE id=? AND user_id=?
  `;
  db.query(sql, [title, description, status, deadline, id, userId], (err, result) => {
    if (err) {
      console.error("Error updating task:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0)
      return res.status(403).json({ message: "Unauthorized or task not found" });

    res.json({ message: "Task updated successfully" });
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  const sql = "DELETE FROM tasks WHERE id=? AND user_id=?";
  db.query(sql, [id, userId], (err, result) => {
    if (err) {
      console.error("Error deleting task:", err);
      return res.status(500).json({ message: "Database error" });
    }
    if (result.affectedRows === 0)
      return res.status(403).json({ message: "Unauthorized or task not found" });

    res.json({ message: "Task deleted successfully" });
  });
});

module.exports = router;
