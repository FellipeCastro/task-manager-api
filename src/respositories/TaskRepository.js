import { consult } from "../database/connection.js";

class TaskRepository {
    async InsertTask(id_board, title, description) {
        try {
            const sql =
                "INSERT INTO tasks (board_id, title, description) VALUES (?, ?, ?)";
            const result = await consult(sql, [id_board, title, description]);
            return { id_task: result.insertId };
        } catch (error) {
            console.error("Erro ao inserir tarefa:", error.message);
            throw new Error("Erro ao criar a tarefa.");
        }
    }

    async InsertSubtask(id_task, title) {
        try {
            const sql = "INSERT INTO subtasks (task_id, title) VALUES (?, ?)";
            const result = await consult(sql, [id_task, title]);
            return { id_subtask: result.insertId };
        } catch (error) {
            console.error("Erro ao inserir subtarefa:", error.message);
            throw new Error("Erro ao criar a subtarefa.");
        }
    }

    async Insert(id_board, title, description, subtasks = []) {
        try {
            const { id_task } = await this.InsertTask(id_board, title, description);

            // Verifica se há subtarefas antes de tentar inseri-las
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
            console.error("Erro ao inserir tarefa e subtarefas:", error.message);
            throw new Error("Erro ao criar a tarefa e suas subtarefas.");
        }
    }

    async Delete(id_board, id_task) {
        try {
            const checkSql = "SELECT id FROM tasks WHERE id = ? AND board_id = ?";
            const task = await consult(checkSql, [id_task, id_board]);

            if (task.length === 0) {
                throw new Error("Tarefa não encontrada ou não pertence ao quadro.");
            }

            const deleteSql = "DELETE FROM tasks WHERE id = ?";
            await consult(deleteSql, [id_task]);

            return { id_task };
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error.message);
            throw new Error(error.message);
        }
    }
}

export default new TaskRepository();
