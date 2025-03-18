import TaskService from "../services/TaskService.js";

class TaskController {
    async Insert(req, res) {
        try {
            const id_board = req.params.id_board;
            const { title, description, subtasks } = req.body;

            if (!title || title.trim() === "") {
                return res.status(400).json({ error: "O título da tarefa é obrigatório." });
            }

            const result = await TaskService.Insert(id_board, title, description, subtasks);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async Delete(req, res) {
        try {
            const id_board = req.params.id_board;
            const id_task = req.params.id_task;

            const result = await TaskService.Delete(id_board, id_task);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new TaskController();
