import Hero from "./hero.model.js";
import Power from "./power.model.js";
import Mission from "./mission.model.js";
import HeroPower from "./heroPower.model.js";
import HeroMission from "./heroMission.model.js";

const associate = () => {
  Hero.belongsToMany(Power, {
    through: HeroPower,
    foreignKey: "id_hero",
    as: "powers",
  });
  
  Hero.belongsToMany(Mission, {
    through: HeroMission,
    foreignKey: "id_hero",
    as: "missions",
  });

  Mission.belongsToMany(Hero, {
    through: HeroMission,
    foreignKey: "id_mission",
    as: "heroes",
  });

  Power.belongsToMany(Hero, {
    through: HeroPower,
    foreignKey: "id_pouvoir",
    as: "heroes",
  });
};

export { associate };
