import { User, Board, Task, Subtask } from "../models/associations.js";

class UserRepository {
    async Register(name, email, password) {
        try {
            const user = await User.create({
                name,
                email,
                password,
            });

            return { id_user: user.id };
        } catch (error) {
            console.error("Erro ao registrar usuário:", error.message);
            throw new Error("Erro ao registrar usuário.");
        }
    }

    async ListByEmail(email) {
        try {
            return await User.findOne({
                where: { email },
            });
        } catch (error) {
            console.error("Erro ao buscar usuário por email:", error.message);
            throw new Error("Erro ao buscar usuário.");
        }
    }

    async Profile(id_user) {
        try {
            const user = await User.findByPk(id_user, {
                attributes: ["id", "name", "email"],
            });

            return user;
        } catch (error) {
            console.error("Erro ao buscar perfil:", error.message);
            throw new Error("Erro ao buscar perfil.");
        }
    }
}

export default new UserRepository();
