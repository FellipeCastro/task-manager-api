import SubtaskRepository from "../respositories/SubtaskRepository.js";

class SubtaskService {
    async Edit(id_subtask, is_done) {
        try {
            if (typeof is_done !== "boolean") {
                throw new Error("O campo 'is_done' deve ser um booleano.");
            }

            return await SubtaskRepository.Edit(id_subtask, is_done);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Delete(id_subtask) {
        try {
            return await SubtaskRepository.Delete(id_subtask);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new SubtaskService();
