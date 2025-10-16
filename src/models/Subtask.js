import { DataTypes } from "sequelize";
import sequelize from "../database/config.js";

const Subtask = sequelize.define(
    "Subtask",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "tasks",
                key: "id",
            },
        },
        title: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        is_done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        tableName: "subtasks",
        timestamps: false,
    }
);

export default Subtask;
