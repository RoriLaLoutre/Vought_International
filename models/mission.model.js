import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Hero from "./hero.model.js";
import HeroMission from "./heroMission.model.js";

const Mission = sequelize.define("missions", {
  id_mission: {
    // type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nom_mission: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("en cours", "terminée", "en pause"),
    allowNull: false,
  },
  is_a_success: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
}, {
  defaultScope: {
    where: { isDeleted: false }
  },
  scopes: {
    deleted: { where: { isDeleted: true } },
    withDeleted: {}, // Aucun filtre appliqué
  }
});

Mission.belongsToMany(Hero, { through: HeroMission, foreignKey: "id_mission", as: "heroes" });

export default Mission;
