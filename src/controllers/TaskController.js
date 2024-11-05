import TaskService from "../services/TaskService.js"

class TaskController {    
    async Insert(req, res) {
        const id_board = req.params.id_board
        const { title, description, subtasks } = req.body

        const result = await TaskService.Insert(id_board, title, description, subtasks)

        res.status(201).json(result)
    }

    async Delete(req, res) {
        const id_board = req.params.id_board
        const id_task = req.params.id_task

        const result = await TaskService.Delete(id_board, id_task)

        res.status(200).json(result)
    }
}

export default new TaskController()
