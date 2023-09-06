import { DataTypes } from "sequelize";
import db from "../utils/database.js";

const All = db.define('all',{
    // Define all table attributes
    // Title, description, completed
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement: true,
    },

    title: {
        type :DataTypes.STRING(30),
        allowNull: false,
    },

    description: {
        type :DataTypes.STRING(250),
        allowNull: false,
    },

    completed: {
        type: DataTypes.BOOLEAN,

    }
});

export default  All;