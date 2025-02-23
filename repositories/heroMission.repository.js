import HeroMission from "../models/heroMission.model.js";
import Mission from "../models/mission.model.js";

export async function addHeroMission(heroId, missionId) {
    return await HeroMission.create({ id_hero: heroId, id_mission: missionId });
}


export async function getHeroMissions(heroId) {
    return await Mission.findAll({
        include: {
            model: HeroMission,
            where: { id_hero: heroId }
        }
    });
}