import BoardRepository from "../respositories/BoardRepository.js";

class BoardService {
    async ListFullStructure(id_user) {
        try {
            return await BoardRepository.ListFullStructure(id_user);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Insert(id_user, title) {
        try {
            if (!title || title.trim() === "") {
                throw new Error("O título do quadro não pode estar vazio.");
            }

            return await BoardRepository.Insert(id_user, title);
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Delete(id_user, id_board) {
        try {
            return await BoardRepository.Delete(id_user, id_board);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default new BoardService();
