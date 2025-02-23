import Hero from "../models/hero.model.js";
import HeroMission from "../models/heroMission.model.js";
import Mission from "../models/mission.model.js";

export async function addHeroMission(heroId, missionId) {
    return await HeroMission.create({ id_hero: heroId, id_mission: missionId });
}


export async function getHeroMissions(heroId) {
    return await Mission.findAll({
      include: {
        model: Hero,
        as: "heroes",
        through: HeroMission,
        where: { id_hero: heroId },
        attributes: [], // ne pas récupérer les attributs du héros
      },
      attributes: ['nom_mission', 'description', 'status', 'is_a_success'], 
    });
  }