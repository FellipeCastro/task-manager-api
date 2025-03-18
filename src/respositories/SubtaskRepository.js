import { consult } from "../database/connection.js";

class SubtaskRepository {
    async Insert(id_task, title) {
        try {
            const sql = "INSERT INTO subtasks (task_id, title) VALUES (?, ?)";
            const result = await consult(sql, [id_task, title]);
            return { id_subtask: result.insertId };
        } catch (error) {
            console.error("Erro ao inserir subtarefa:", error.message);
            throw new Error("Erro ao criar a subtarefa.");
        }
    }

    async Edit(id_subtask, is_done) {
        try {
            const checkSql = "SELECT id FROM subtasks WHERE id = ?";
            const subtaskExists = await consult(checkSql, [id_subtask]);

            if (subtaskExists.length === 0) {
                throw new Error("Subtarefa não encontrada.");
            }

            const sql = "UPDATE subtasks SET is_done = ? WHERE id = ?";
            await consult(sql, [is_done, id_subtask]);

            return { id_subtask };
        } catch (error) {
            console.error("Erro ao editar subtarefa:", error.message);
            throw new Error(error.message);
        }
    }

    async Delete(id_subtask) {
        try {
            const checkSql = "SELECT id FROM subtasks WHERE id = ?";
            const subtaskExists = await consult(checkSql, [id_subtask]);

            if (subtaskExists.length === 0) {
                throw new Error("Subtarefa não encontrada.");
            }

            const sql = "DELETE FROM subtasks WHERE id = ?";
            await consult(sql, [id_subtask]);

            return { id_subtask };
        } catch (error) {
            console.error("Erro ao deletar subtarefa:", error.message);
            throw new Error(error.message);
        }
    }
}

export default new SubtaskRepository();
