import bcrypt from "bcrypt"
import Token from "../token.js"

import UserRepository from "../respositories/UserRepository.js"

class UserService {
    async Register(name, email, password) {
        const hashedPassword = await bcrypt.hash(password, 10)
        const result = await UserRepository.Register(name, email, hashedPassword)

        result.token = Token.Create(result.id_user)

        return result
    }

    async Login(email, password) {
        const result = await UserRepository.ListByEmail(email)

        if (result.length === 0) {
            return []
        }

        if (await bcrypt.compare(password, result.password)) {
            delete result.password

            result.token = Token.Create(result.id)

            return result
        }

        return []
    }

    async Profile(id_user) {
        const result = await UserRepository.Profile(id_user)

        return result
    }
}

export default new UserService()
