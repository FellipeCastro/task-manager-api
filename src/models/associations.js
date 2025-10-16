import User from "./User.js";
import Board from "./Board.js";
import Task from "./Task.js";
import Subtask from "./Subtask.js";

// User -> Board (One-to-Many)
User.hasMany(Board, {
    foreignKey: "user_id",
    as: "boards"
});

Board.belongsTo(User, {
    foreignKey: "user_id",
    as: "user"
});

// Board -> Task (One-to-Many)
Board.hasMany(Task, {
    foreignKey: "board_id",
    as: "tasks"
});

Task.belongsTo(Board, {
    foreignKey: "board_id",
    as: "board"
});

// Task -> Subtask (One-to-Many)
Task.hasMany(Subtask, {
    foreignKey: "task_id",
    as: "subtasks"
});

Subtask.belongsTo(Task, {
    foreignKey: "task_id",
    as: "task"
});

export { User, Board, Task, Subtask };