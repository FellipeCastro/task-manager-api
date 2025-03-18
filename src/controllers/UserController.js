import UserService from "../services/UserService.js";

class UserController {
    async Register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos são obrigatórios." });
            }

            const result = await UserService.Register(name, email, password);
            return res.status(201).json(result);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async Login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "Email e senha são obrigatórios." });
            }

            const result = await UserService.Login(email, password);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }
    }

    async Profile(req, res) {
        try {
            const id_user = req.id_user;

            if (!id_user) {
                return res.status(400).json({ error: "ID do usuário não informado." });
            }

            const result = await UserService.Profile(id_user);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json({ error: error.message });
        }
    }
}

export default new UserController();
