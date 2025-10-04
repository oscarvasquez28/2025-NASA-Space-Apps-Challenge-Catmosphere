import {DataTypes, Model} from "sequelize";
import dbConnection from "../config/database.js";

class UserModel extends Model {}

UserModel.init({
    user_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    first_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    has_asthma: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    has_allergies: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    has_cardiovascular_conditions: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_pregnant: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    is_athlete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },

    has_kids_at_home: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    has_seniors_at_home: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    spends_time_outdoors: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: dbConnection,
    modelName: "Users",
    timestamps: true,
})

export default UserModel