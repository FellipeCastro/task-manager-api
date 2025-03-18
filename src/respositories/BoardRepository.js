import { consult } from "../database/connection.js";

class BoardRepository {
    async ListFullStructure(id_user) {
        try {
            const boardsSql = "SELECT id, title FROM boards WHERE user_id = ?";
            const boards = await consult(boardsSql, [id_user]);

            for (const board of boards) {
                const tasksSql =
                    "SELECT id, title, description FROM tasks WHERE board_id = ?";
                const tasks = await consult(tasksSql, [board.id]);

                for (const task of tasks) {
                    const subtasksSql =
                        "SELECT id, title, is_done FROM subtasks WHERE task_id = ?";
                    const subtasks = await consult(subtasksSql, [task.id]);

                    task.subtasks = subtasks;
                }

                board.tasks = tasks;
            }

            return boards;
        } catch (error) {
            console.error("Erro ao listar estrutura completa:", error.message);
            throw new Error("Erro ao carregar estrutura dos quadros.");
        }
    }

    async Insert(id_user, title) {
        try {
            const sql = "INSERT INTO boards (user_id, title) VALUES (?, ?)";
            const result = await consult(sql, [id_user, title]);

            return { id_board: result.insertId };
        } catch (error) {
            console.error("Erro ao criar quadro:", error.message);
            throw new Error("Erro ao criar o quadro.");
        }
    }

    async Delete(id_user, id_board) {
        try {
            const checkSql = "SELECT id FROM boards WHERE id = ? AND user_id = ?";
            const board = await consult(checkSql, [id_board, id_user]);

            if (board.length === 0) {
                throw new Error("Quadro não encontrado ou não pertence ao usuário.");
            }

            const deleteSql = "DELETE FROM boards WHERE id = ?";
            await consult(deleteSql, [id_board]);

            return { id_board };
        } catch (error) {
            console.error("Erro ao deletar quadro:", error.message);
            throw new Error(error.message);
        }
    }
}

export default new BoardRepository();
