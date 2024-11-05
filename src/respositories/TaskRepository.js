import { consult } from "../database/connection.js"

class TaskRepository {    
    async InsertTask(id_board, title, description) {
        const sql = "INSERT INTO tasks (board_id, title, description) VALUES (?, ?, ?)"
        const result = await consult(sql, [id_board, title, description])
        return { id_task: result.insertId }
    }

    async InsertSubtask(id_task, title) {
        const sql = "INSERT INTO subtasks (task_id, title) VALUES (?, ?)"
        const result = await consult(sql, [id_task, title])
        return { id_subtask: result.insertId }
    }

    async Insert(id_board, title, description, subtasks) {
        // Inserir a tarefa principal
        const { id_task } = await this.InsertTask(id_board, title, description)

        // Inserir cada subtarefa vinculada à tarefa principal
        const subtaskResults = await Promise.all(
            subtasks.map(subtask => this.InsertSubtask(id_task, subtask.title))
        )

        return {
            id_task,
            subtasks: subtaskResults
        }
    }

    async Delete(id_board, id_task) {
        const sql = "DELETE FROM tasks WHERE id = ? AND board_id = ?"
        await consult(sql, [id_task, id_board])
        return { id_task }
    }
}

export default new TaskRepository()
