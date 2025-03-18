import SubtaskService from "../services/SubtaskService.js";

class SubtaskController {
    async Edit(req, res) {
        try {
            const id_subtask = req.params.id_subtask;
            const { is_done } = req.body;

            if (typeof is_done !== "boolean") {
                return res.status(400).json({ error: "O campo 'is_done' deve ser um booleano." });
            }

            const result = await SubtaskService.Edit(id_subtask, is_done);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async Delete(req, res) {
        try {
            const id_subtask = req.params.id_subtask;

            const result = await SubtaskService.Delete(id_subtask);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

export default new SubtaskController();
