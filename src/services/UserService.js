import bcrypt from "bcrypt";
import Token from "../token.js";
import UserRepository from "../respositories/UserRepository.js";

class UserService {
    async Register(name, email, password) {
        try {
            // Verifica se o email já está cadastrado
            const existingUser = await UserRepository.ListByEmail(email);
            if (existingUser) {
                throw new Error("Email já cadastrado.");
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const result = await UserRepository.Register(
                name,
                email,
                hashedPassword
            );

            result.token = Token.Create(result.id_user);

            return result;
        } catch (error) {
            console.error("Erro ao registrar usuário:", error.message);
            throw new Error(error.message);
        }
    }

    async Login(email, password) {
        try {
            const user = await UserRepository.ListByEmail(email);

            if (!user) {
                throw new Error("Email não cadastrado.");
            }

            if (!(await bcrypt.compare(password, user.password))) {
                throw new Error("Senha incorreta.");
            }

            delete user.password;
            user.token = Token.Create(user.id);

            return user;
        } catch (error) {
            console.error("Erro ao fazer login:", error.message);
            throw new Error(error.message);
        }
    }

    async Profile(id_user) {
        try {
            const user = await UserRepository.Profile(id_user);

            if (!user) {
                throw new Error("Usuário não encontrado.");
            }

            return user;
        } catch (error) {
            console.error("Erro ao buscar perfil:", error.message);
            throw new Error(error.message);
        }
    }
}

export default new UserService();
