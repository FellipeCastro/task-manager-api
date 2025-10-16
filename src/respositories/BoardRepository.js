import { Board, Task, Subtask } from "../models/associations.js";

class BoardRepository {
    async ListFullStructure(id_user) {
        try {
            const boards = await Board.findAll({
                where: { user_id: id_user },
                attributes: ["id", "title"],
                include: [
                    {
                        model: Task,
                        as: "tasks",
                        attributes: ["id", "title", "description"],
                        include: [
                            {
                                model: Subtask,
                                as: "subtasks",
                                attributes: ["id", "title", "is_done"],
                            },
                        ],
                    },
                ],
            });

            return boards;
        } catch (error) {
            console.error("Erro ao listar estrutura completa:", error.message);
            throw new Error("Erro ao carregar estrutura dos quadros.");
        }
    }

    async Insert(id_user, title) {
        try {
            const board = await Board.create({
                user_id: id_user,
                title,
            });

            return { id_board: board.id };
        } catch (error) {
            console.error("Erro ao criar quadro:", error.message);
            throw new Error("Erro ao criar o quadro.");
        }
    }

    async Delete(id_user, id_board) {
        try {
            const board = await Board.findOne({
                where: {
                    id: id_board,
                    user_id: id_user,
                },
            });

            if (!board) {
                throw new Error(
                    "Quadro não encontrado ou não pertence ao usuário."
                );
            }

            await Board.destroy({
                where: { id: id_board },
            });

            return { id_board };
        } catch (error) {
            console.error("Erro ao deletar quadro:", error.message);
            throw new Error(error.message);
        }
    }
}

export default new BoardRepository();
