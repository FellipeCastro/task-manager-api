import BoardService from "../services/BoardService.js"

class BoardController {
    async ListFullStructure(req, res) {
        const id_user = req.id_user

        const result = await BoardService.ListFullStructure(id_user)

        res.status(200).json(result)
    }
    
    async Insert(req, res) {
        const id_user = req.id_user
        const { title } = req.body

        const result = await BoardService.Insert(id_user, title)

        res.status(201).json(result)
    }

    async Delete(req, res) {
        const id_user = req.id_user
        const id_board = req.params.id_board

        const result = await BoardService.Delete(id_user, id_board)

        res.status(200).json(result)
    }
}

export default new BoardController()
