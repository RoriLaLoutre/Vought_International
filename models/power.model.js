import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Hero from "./hero.model.js";
import HeroPower from "./heroPower.model.js";

const Power = sequelize.define("powers", { id_pouvoir: {
  // type: DataTypes.UUIDV4,
  primaryKey: true,
  // defaultValue: DataTypes.UUIDV4,
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

Power.belongsToMany(Hero, { through: HeroPower, foreignKey: "id_pouvoir", as: "heroes" });

export default Power;