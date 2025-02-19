import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const HeroPower = sequelize.define("hero_pouvoir", {
  id_hero: { type: DataTypes.INTEGER, primaryKey: true },
  id_pouvoir: { type: DataTypes.INTEGER, primaryKey: true },
}, { timestamps: false });

export default HeroPower;
