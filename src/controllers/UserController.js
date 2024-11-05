import UserService from "../services/UserService.js"

class UserController {
    async Register(req, res) {
        const { name, email, password } = req.body

        const result = await UserService.Register(name, email, password)

        res.status(201).json(result)
    }

    async Login(req, res) {
        const { email, password } = req.body
        const result = await UserService.Login(email, password)

        if (result.length === 0) {
            res.status(401).json({ error: "Email ou senha inválidos" })
        }

        res.status(200).json(result)
    }

    async Profile(req, res) {
        const id_user = req.id_user
        const result = await UserService.Profile(id_user)

        res.status(200).json(result)
    }
}

export default new UserController()
