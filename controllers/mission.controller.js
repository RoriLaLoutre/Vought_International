import { MissionService } from "../services/index.service.js";
import { HeroError } from "../errors/index.error.js";

export async function getAllMissions(req, res , next) {
  try {
    const missions = await MissionService.getAllMissions();
    res.json(missions);
    // res.send("<h1>Liste des missions: </h1>" + JSON.stringify(missions))
  } catch (error) {
    next(error)
  }
}

export async function getAllMissionsByStatus(req, res , next) {
  const status = req.params.status;
  try {
    const missions = await MissionService.getAllMissionsByStatus();
    res.json(missions);
    // res.send("<h1>Liste des missions: </h1>" + JSON.stringify(missions))
  } catch (error) {
    next(error)
  }
}

export async function getAllMissionsBySuccess(req, res , next) {
  const is_a_success = req.params.is_a_success;
  try {
    const missions = await MissionService.getAllMissionsBySuccess();
    res.json(missions);
  } catch (error) {
    next(error)
  }
}



export async function getMissionById(req, res , next) {
  try {
    const id = req.params.id;
    const mission = await MissionService.getMissionById(id);
    res.json(mission);
  } catch (error) {
    next(error)
  }
}

export async function getMissionByName(req, res , next) {
  try {
    const name = req.params.nom_mission;
    const mission = await MissionService.getMissionByName(name);
    res.json(mission);
  } catch (error) {
    next(error)
  }
}

export async function createMission(req, res , next) {
  try {
    const { nom_mission, description, status, is_a_success} = req.body;
    const newMission = await HeroService.createHero({ 
        nom_mission,
        description,
        status, 
        is_a_success
    });
    res.json(newMission);
  } catch (error) {
    next(error)
  }
}

export async function updateMission(req, res , next) {
  try {
    const id = req.params.id;
    const { nom_mission, description, status, is_a_success} = req.body;
    const updatedMission = await MissionService.updateMission(id, {
        nom_mission, 
        description, 
        status, 
        is_a_success
    });
    res.json(updatedMission);
  } catch (error) {
    next(error)
  }
}

export async function deletedMissionById(req, res , next) {
  try {
    const id = req.params.id;
    const deletedMission = await MissionService.deletedMissionById(id);
    res.json(deletedMission);
  } catch (error) {
    next(error)
  }
}

export async function restoreMission(req, res , next) {
  try {
    const id = req.params.id;
    const restoredMission = await MissionService.restoreMission(id);
    res.json(restoredMission);
  } catch (error) {
    next(error)
  }
}
