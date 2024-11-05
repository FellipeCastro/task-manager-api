import mysql from "mysql2"
import "dotenv/config"

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect()

export const consult = (command, params) => {
    return new Promise((resolve, reject) => {
        connection.query(command, params, (error, result) => {
            if (error) return reject(error)
            const row = JSON.parse(JSON.stringify(result))
            return resolve(row)
        })
    })
}

export default connection
