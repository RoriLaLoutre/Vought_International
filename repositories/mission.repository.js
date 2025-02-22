import Mission from "../models/mission.model.js";

// CREATE
export async function createMission({ nom_mission, description, status, is_a_success }) {
    return await Mission.create({ nom_mission, description, status, is_a_success });
}


// READ
export async function getMissionById(id) {
    const mission = await  Mission.findByPk(id)
    if (!mission){
        return null
    }
    return mission
}

export async function getMissionByName(nom_mission) {
    const mission = await Mission.findOne({where : {nom_mission}})
    if (!mission){
        return null
    }
    return mission
}

export async function getAllMissionsByStatus(status) {
    const missions = await Mission.findAll({where : {status}})
    return missions
}
export async function getAllMissionsBySuccess(is_a_success) {
    const missions = await Mission.findAll({where : {is_a_success}})
    return missions
}

export async function getAllMissions() {
    return await Mission.findAll();
}

export async function getAllMissionsWithDeleted() {
    return await Mission.scope("withDeleted").findAll();
}

// UPDATE
export async function updateMission(id, values) {
    const mission = await getMissionById(id);
    return mission ? await mission.update(values) : null;
}

// DELETE (SOFT DELETE)
export async function deletedMissionById(id) {
    return await Mission.scope("deleted").findByPk(id) || null;
}

export async function restoreMission(id) {
    const deletedMission = await deletedMissionById(id);
    
    if (!deletedMission || await missionExists(deletedMission.id)) {
        return null;
    }
    
    return await deletedMission.update({ isDeleted: false });
}

// CHECK IF MISSION EXISTS
export async function missionExists(nom_mission) {
    return Boolean(await Mission.findOne({ where: { nom_mission } }));
}

export async function missionDeletedExists(id) {
    return Boolean(await Mission.scope("deleted").findOne({ where: { id } }));
}

export async function getAllMissionsDeleted() {
    return await Mission.scope("deleted").findAll();
}


// LINK

// addHeroToMission(id_hero , id_mission)
// deleteHeroFromMission(id_hero , id_mission)