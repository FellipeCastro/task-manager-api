import { consult } from "../database/connection.js"

class UserRepository {
    async Register(name, email, password) {
        const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"

        const result = await consult(sql, [name, email, password])

        return { id_user: result.insertId }
    }

    async ListByEmail(email) {
        const sql = "SELECT * FROM users WHERE email = ?"

        const result = await consult(sql, [email])

        if (result.length === 0) {
            return []
        }

        return result[0]
    }

    async Profile(id_user) {
        const sql = "SELECT id, name, email FROM users WHERE id = ?"

        const result = await consult(sql, [id_user])

        if (result.length === 0) {
            return []
        }

        return result
    }
}

export default new UserRepository()
