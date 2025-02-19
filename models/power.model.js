import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const Power = sequelize.define("powers", { id: {
  primaryKey: true,
  type: DataTypes.INTEGER,
  autoIncrement: true
},
nom_pouvoir: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
description_pouvoir: {
  type: DataTypes.STRING,
  allowNull: false,
},
isDeleted: {
  type: DataTypes.BOOLEAN,
  allowNull: false,
  defaultValue: false
}}, {
  defaultScope: {
    where: {
      isDeleted: false
    }
  }, 
  scopes: {
    deleted: {
      where: {
        isDeleted: true
      }
    },
    withDeleted: {},
  }
});

export default Power;