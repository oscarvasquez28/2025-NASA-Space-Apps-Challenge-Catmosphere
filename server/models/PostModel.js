import {DataTypes, Model} from "sequelize";
import dbConnection from "../config/database.js";

class PostModel extends Model {}

PostModel.init({
    post_id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: dbConnection,
    modelName: "Posts",
    timestamps: true,
})

export default PostModel