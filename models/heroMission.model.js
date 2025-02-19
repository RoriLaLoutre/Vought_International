import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";

const HeroMission = sequelize.define("hero_mission", {
  id_hero: { type: DataTypes.INTEGER, primaryKey: true },
  id_mission: { type: DataTypes.INTEGER, primaryKey: true },
}, { timestamps: false });

export default HeroMission;
