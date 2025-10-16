import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";

const Task = sequelize.define(
    "Task",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        board_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "boards",
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "tasks",
        timestamps: false,
    }
);

export default Task;
