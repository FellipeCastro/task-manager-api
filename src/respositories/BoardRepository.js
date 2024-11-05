import { consult } from "../database/connection.js"

class BoardRepository {
    async ListFullStructure(id_user) {
        const boardsSql = "SELECT id, title FROM boards WHERE user_id = ?"
        const boards = await consult(boardsSql, [id_user])

        for (const board of boards) {
            const tasksSql = "SELECT id, title, description FROM tasks WHERE board_id = ?"
            const tasks = await consult(tasksSql, [board.id])
            
            for (const task of tasks) {
                const subtasksSql = "SELECT id, title, is_done FROM subtasks WHERE task_id = ?"
                const subtasks = await consult(subtasksSql, [task.id])

                task.subtasks = subtasks 
            }

            board.tasks = tasks
        }

        return boards
    }
    
    async Insert(id_user, title) {
        const sql = "INSERT INTO boards (user_id, title) VALUES (?, ?)"

        const result = await consult(sql, [id_user, title])

        return { id_board: result.insertId }
    }

    async Delete(id_user, id_board) {
        const sql = "DELETE FROM boards WHERE id = ? AND user_id = ?"

        await consult(sql, [id_board, id_user])

        return { id_board }
    }
}

export default new BoardRepository()
