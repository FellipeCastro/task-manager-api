import BoardService from "../services/BoardService.js";

class BoardController {
    async ListFullStructure(req, res) {
        try {
            const id_user = req.id_user;
            const result = await BoardService.ListFullStructure(id_user);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async Insert(req, res) {
        try {
            const id_user = req.id_user;
            const { title } = req.body;

            if (!title || title.trim() === "") {
                return res.status(400).json({ error: "O título do quadro é obrigatório." });
            }

            const result = await BoardService.Insert(id_user, title);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async Delete(req, res) {
        try {
            const id_user = req.id_user;
            const id_board = req.params.id_board;

            const result = await BoardService.Delete(id_user, id_board);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new BoardController();
