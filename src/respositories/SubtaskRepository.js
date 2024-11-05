import { consult } from "../database/connection.js"

class SubtaskRepository {
    async Insert(id_task, title) {
        const sql = "INSERT INTO subtasks (task_id, title) VALUES (?, ?)"

        const result = await consult(sql, [id_task, title])

        return { id_subtask: result.insertId }
    }

    async Edit(id_subtask, is_done) {
        const sql = "UPDATE subtasks SET is_done = ? WHERE id = ?"

        await consult(sql, [is_done, id_subtask])

        return { id_subtask }
    }

    async Delete(id_subtask) {
        const sql = "DELETE FROM subtasks WHERE id = ?"

        await consult(sql, [id_subtask])

        return { id_subtask }
    }
}

export default new SubtaskRepository()
