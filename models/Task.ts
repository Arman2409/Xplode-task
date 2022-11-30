import { DataTypes } from "sequelize";
import sequelize from "../database/sequelize";

const Task = sequelize.define("todos", {
    name: DataTypes.TEXT,
});

export default Task;