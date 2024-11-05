import jwt from "jsonwebtoken"
import "dotenv/config"

const secret = process.env.TOKEN_SECRET

class Token {
    Create(id_user) {
        const token = jwt.sign({ id_user }, secret, {
            expiresIn: "7d"
        })

        return token
    }

    Validate(req, res, next) {
        const authToken = req.headers.authorization

        if (!authToken) {
            return res.status(401).json({ error: "Token não informado" })
        }

        const [_, token] = authToken.split(" ")

        jwt.verify(token, secret, (err, tokenDecoded) => {
            if (err) {
                return res.status(401).json({ error: "Token inválido" })
            }

            req.id_user = tokenDecoded.id_user

            next()
        })
    }
}

export default new Token()
