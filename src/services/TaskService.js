import TaskRepository from "../respositories/TaskRepository.js";

class TaskService {
    async Insert(id_board, title, description, subtasks) {
        try {
            if (!title || title.trim() === "") {
                throw new Error("O título da tarefa é obrigatório.");
            }

            if (!Array.isArray(subtasks)) {
                throw new Error("A lista de subtarefas deve ser um array.");
            }

            return await TaskRepository.Insert(id_board, title, description, subtasks);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Delete(id_board, id_task) {
        try {
            return await TaskRepository.Delete(id_board, id_task);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new TaskService();
