import { consult } from "../database/connection.js";

class UserRepository {
    async Register(name, email, password) {
        try {
            const sql =
                "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

            const result = await consult(sql, [name, email, password]);

            return { id_user: result.insertId };
        } catch (error) {
            console.error("Erro ao registrar usuário:", error.message);
            throw new Error("Erro ao registrar usuário.");
        }
    }

    async ListByEmail(email) {
        try {
            const sql = "SELECT * FROM users WHERE email = ?";
            const result = await consult(sql, [email]);

            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Erro ao buscar usuário por email:", error.message);
            throw new Error("Erro ao buscar usuário.");
        }
    }

    async Profile(id_user) {
        try {
            const sql = "SELECT id, name, email FROM users WHERE id = ?";
            const result = await consult(sql, [id_user]);

            return result.length > 0 ? result[0] : null;
        } catch (error) {
            console.error("Erro ao buscar perfil:", error.message);
            throw new Error("Erro ao buscar perfil.");
        }
    }
}

export default new UserRepository();
