import { Task, Subtask } from "../models/associations.js";

class TaskRepository {
    async InsertTask(id_board, title, description) {
        try {
            const task = await Task.create({
                board_id: id_board,
                title,
                description,
            });

            return { id_task: task.id };
        } catch (error) {
            console.error("Erro ao inserir tarefa:", error.message);
            throw new Error("Erro ao criar a tarefa.");
        }
    }

    async InsertSubtask(id_task, title) {
        try {
            const subtask = await Subtask.create({
                task_id: id_task,
                title,
            });

            return { id_subtask: subtask.id };
        } catch (error) {
            console.error("Erro ao inserir subtarefa:", error.message);
            throw new Error("Erro ao criar a subtarefa.");
        }
    }

    async Insert(id_board, title, description, subtasks = []) {
        try {
            const { id_task } = await this.InsertTask(
                id_board,
                title,
                description
            );

            const subtaskResults = subtasks.length
                ? await Promise.all(
                      subtasks.map((subtask) =>
                          this.InsertSubtask(id_task, subtask.title)
                      )
                  )
                : [];

            return {
                id_task,
                subtasks: subtaskResults,
            };
        } catch (error) {
            console.error(
                "Erro ao inserir tarefa e subtarefas:",
                error.message
            );
            throw new Error("Erro ao criar a tarefa e suas subtarefas.");
        }
    }

    async Delete(id_board, id_task) {
        try {
            const task = await Task.findOne({
                where: {
                    id: id_task,
                    board_id: id_board,
                },
            });

            if (!task) {
                throw new Error(
                    "Tarefa não encontrada ou não pertence ao quadro."
                );
            }

            await Task.destroy({
                where: { id: id_task },
            });

            return { id_task };
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error.message);
            throw new Error(error.message);
        }
    }
}

export default new TaskRepository();
