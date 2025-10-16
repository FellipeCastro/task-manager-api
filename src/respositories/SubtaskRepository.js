import { Subtask } from "../models/associations.js";

class SubtaskRepository {
    async Insert(id_task, title) {
        try {
            const subtask = await Subtask.create({
                task_id: id_task,
                title,
            });

            return { id_subtask: subtask.id };
        } catch (error) {
            console.error("Erro ao inserir subtarefa:", error.message);
            throw new Error("Erro ao criar a subtarefa.");
        }
    }

    async Edit(id_subtask, is_done) {
        try {
            const subtask = await Subtask.findByPk(id_subtask);

            if (!subtask) {
                throw new Error("Subtarefa não encontrada.");
            }

            await Subtask.update({ is_done }, { where: { id: id_subtask } });

            return { id_subtask };
        } catch (error) {
            console.error("Erro ao editar subtarefa:", error.message);
            throw new Error(error.message);
        }
    }

    async Delete(id_subtask) {
        try {
            const subtask = await Subtask.findByPk(id_subtask);

            if (!subtask) {
                throw new Error("Subtarefa não encontrada.");
            }

            await Subtask.destroy({
                where: { id: id_subtask },
            });

            return { id_subtask };
        } catch (error) {
            console.error("Erro ao deletar subtarefa:", error.message);
            throw new Error(error.message);
        }
    }
}

export default new SubtaskRepository();
