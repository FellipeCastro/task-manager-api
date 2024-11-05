import SubtaskRepository from "../respositories/SubtaskRepository.js"

class SubtaskService {
    async Edit(id_subtask, is_done) {
        const result = await SubtaskRepository.Edit(id_subtask, is_done)

        return result
    }

    async Delete(id_subtask) {
        const result = await SubtaskRepository.Delete(id_subtask)

        return result
    }
}

export default new SubtaskService()
