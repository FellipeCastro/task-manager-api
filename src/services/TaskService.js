import TaskRepository from "../respositories/TaskRepository.js"

class TaskService {    
    async Insert(id_board, title, description, subtasks) {
        const { id_task } = await TaskRepository.InsertTask(id_board, title, description)

        const subtaskResults = await Promise.all(
            subtasks.map(subtask => TaskRepository.InsertSubtask(id_task, subtask.title))
        )

        return {
            id_task,
            subtasks: subtaskResults
        }
    }

    async Delete(id_board, id_task) {
        const result = await TaskRepository.Delete(id_board, id_task)
        return result
    }
}

export default new TaskService()
