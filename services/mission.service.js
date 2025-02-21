import { MissionRepository } from "../repositories/index.repository.js";
import { HeroError } from "../errors/index.error.js";


export async function getMissionById(id) {
  const mission = await MissionRepository.getMissionById(id);

  if (!mission) {
    throw new HeroError.NotFoundError("La mission n'existe pas."); // fait
  }

  return {
    id: mission.id,
    nom_mission: mission.nom_mission,
    description: mission.description,
    status: mission.status,
    is_a_success: mission.is_a_success,
  };
}

export async function getMissionByName(nom_mission) {
    const mission = await MissionRepository.getMissionByName(nom_mission);
  
    if (!mission) {
      throw new HeroError.NotFoundError("La mission n'existe pas."); // fait
    }
  
    return {
      id: mission.id,
      nom_mission: mission.nom_mission,
      description: mission.description,
      status: mission.status,
      is_a_success: mission.is_a_success,
    };
  }

export async function getAllMissionsByStatus(status) {
    const missions = await MissionRepository.getAllMissionsByStatus(status);

    if (!missions) {
        throw new HeroError.NotFoundError(`Aucune mission a pour statue ${status}`); // fait
    }
    return{
        id: missions.id,
        nom_mission: missions.nom_mission,
        status: missions.status,
    }
}

export async function getAllMissionsBySuccess(is_a_success) {
    const missions = await MissionRepository.getAllMissionsBySuccess(is_a_success);

    if (!missions) {
        throw new HeroError.NotFoundError(`Aucune mission a pour success ${is_a_success}`); // fait
    }
    return{
        id: missions.id,
        nom_mission: missions.nom_mission,
        status: missions.is_a_success,
    }
}

export async function getAllMissions() {
  const missions = await MissionRepository.getAllMissions();

  const formattedMissions = missions.map(mission => {
    return {
      id: mission.id,
      nom_mission: mission.nom_mission,
      description: mission.description,
      status: mission.status,
      is_a_success: mission.is_a_success,
    }
  })

  return formattedMissions;
}

export async function createMission({ nom_mission, description, status, is_a_success}) {
  if (!nom_mission || nom_mission.length < 3 || !/^[a-zA-Z ]+$/.test(nom_mission)) {
    throw new HeroError.BadRequestError("Le nom de la mission est non valide (3 caractères min, et aps de caractère spéciaux )");
  }

  if (await MissionRepository.missionExists(nom_mission)) {
    throw new HeroError.ConflictError("La mission à déja été crée (nom_mission).");  
  }

  if (typeof status !== 'boolean') {
    throw new HeroError.BadRequestError("Le statut de la mission doit être un booléen.");
  }

  if (typeof is_a_success !== 'boolean') {
    throw new HeroError.BadRequestError("La réussite de la mission doit être un booléen.");
  }

  const mission = await MissionRepository.createMission({nom_mission, description, status, is_a_success});

  return mission.dataValues;
}

export async function updateMission(id, { nom_mission, description, status, is_a_success}) {
  if (!nom_mission || nom_mission.length < 3 || !/^[a-zA-Z ]+$/.test(nom_mission)) {
    throw new HeroError.BadRequestError("le nom de la mission est non valide (3 caractères min, et aps de caractère spéciaux )"); // fait
  }

  if (await MissionRepository.missionExists(nom_mission)) {
    throw new HeroError.ConflictError("La mission existe déja"); 
  }
  if (!await getMissionById(id)){
    throw new HeroError.NotFoundError("La mission n'existe pas à l'id spécifié")
  }

  const mission = await MissionRepository.updateMission(id, {
    nom_mission,
    description,
    status,
    is_a_success
});
    
  

  return mission.dataValues;
}

export async function deletedMissionById(id) {
  if (!(await getMissionById(id))) {
    throw new HeroError.NotFoundError("La mission n'existe pas.");
  }

  return (await MissionRepository.deletedMissionById(id)).datavalues;
}


export async function restoreMission(id){
  const restoreMission = await MissionRepository.restoreMission(id)

  if (!restoreMission){
    throw new HeroError.NotFoundError("La mission n'existe pas , elle ne peut pas être restauré");
  }
  if (await MissionRepository.missionExists(restoreMission.nom_mission)){
    throw new HeroError.ConflictError("La mission existe déja")
  }
  return restoreMission
}