import sequelize from "../config/database.js";
import { DataTypes } from "sequelize";
import Power from "./power.model.js";
import Mission from "./mission.model.js";
import HeroPower from "./heroPower.model.js";
import HeroMission from "./HeroMission.js";

const Hero = sequelize.define("heroes", { id_hero: {
  // type: DataTypes.UUIDV4,
  primaryKey: true,
  // defaultValue: DataTypes.UUIDV4,
  type: DataTypes.INTEGER,
  autoIncrement: true
},
alias: {
  type: DataTypes.STRING,
  allowNull: false,
  unique: true
},
identity: {
  type: DataTypes.STRING,
  allowNull: false,
},
powerDate: {
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

Hero.belongsToMany(Power, { through: HeroPower, foreignKey: "id_hero", as: "powers" });
Hero.belongsToMany(Mission, { through: HeroMission, foreignKey: "id_hero", as: "missions" });

export default Hero;
