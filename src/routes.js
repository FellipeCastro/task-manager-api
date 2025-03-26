import { Router } from "express";
import Token from "./token.js";

import UserController from "./controllers/UserController.js";
import BoardController from "./controllers/BoardController.js";
import TaskController from "./controllers/TaskController.js";
import SubtaskController from "./controllers/SubtaskController.js";

const router = Router();

// Users
router.post("/users/register", UserController.Register);
router.post("/users/login", UserController.Login);
router.get("/users/profile/:id_user", Token.Validate, UserController.Profile);

//Boards
router.get(
    "/boards/overview",
    Token.Validate,
    BoardController.ListFullStructure
);
router.post("/boards", Token.Validate, BoardController.Insert);
router.delete("/boards/:id_board", Token.Validate, BoardController.Delete);

// Tasks
router.post("/tasks/:id_board", Token.Validate, TaskController.Insert);
router.delete(
    "/tasks/:id_board/:id_task",
    Token.Validate,
    TaskController.Delete
);

// Subtasks
router.put("/subtasks/:id_subtask", Token.Validate, SubtaskController.Edit);
router.delete(
    "/subtasks/:id_subtask",
    Token.Validate,
    SubtaskController.Delete
);

export default router;
