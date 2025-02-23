import { HeroRepository , PowerRepository , MissionRepository } from "../repositories/index.repository.js";
import { HeroError } from "../errors/index.error.js";
import { HeroPowerRepository, HeroMissionRepository } from "../repositories/index.repository.js";


export async function getHeroById(id) {
  const hero = await HeroRepository.getHeroById(id);

  if (!hero) {
    throw new HeroError.NotFoundError("Le héros n'existe pas."); // fait
  }

  return {
    id: hero.id,
    alias: hero.alias,
    powerDate: hero.powerDate.slice(-4),
  };
}

export async function getAllHeroes() {
  const heroes = await HeroRepository.getAllHeroes();

  const formattedHeroes = heroes.map(hero => {
    return {
      id: hero.id,
      alias: hero.alias,
      powerDate: hero.powerDate.slice(-4),
    }
  })

  return formattedHeroes;
}

export async function createHero({ alias, identity, powerDate }) {
  if (!alias || alias.length < 3 || !/^[a-zA-Z ]+$/.test(alias)) {
    throw new HeroError.BadRequestError("Alias non valide (3 caractères min, etc.)"); // fait
  }

  if (await HeroRepository.heroExists(alias)) {
    throw new HeroError.ConflictError("Le héros existe déjà (alias).");  // fait
  }

  const hero = await HeroRepository.createHero({ alias, identity, powerDate });

  return hero.dataValues;
}

export async function updateHero(id, { alias, identity, powerDate }) {
  if (!alias || alias.length < 3 || !/^[a-zA-Z ]+$/.test(alias)) {
    throw new HeroError.BadRequestError("Alias non valide (3 caractères min, etc.)"); // fait
  }

  if (await HeroRepository.heroExists(alias)) {
    throw new HeroError.ConflictError("Le héros existe déjà (alias)."); // fait
  }
  if (!await getHeroById(id)){
    throw new HeroError.NotFoundError("Le héros n'existe pas à l'id spécifié")
  }

  const hero = await HeroRepository.updateHero(id, {
    alias,
    identity,
    powerDate,
  });

  return hero.dataValues;
}

export async function deleteHero(id) {
  if (!(await getHeroById(id))) {
    throw new HeroError.NotFoundError("Le héros n'existe pas.");
  }

  return (await HeroRepository.deleteHero(id)).datavalues;
}


export async function restoreHero(id){
  const restoredHero = await HeroRepository.restoreHero(id)

  if (!restoredHero){
    throw new HeroError.NotFoundError("Le hero n'existe pas , il ne peut pas être restauré"); // fait
  }
  if (await HeroRepository.heroExists(restoredHero.alias)){
    throw new HeroError.ConflictError("Le héros existe déja")
  }
  return restoredHero
}

// methodes pour les tables liées

export async function addPowerToHero(heroId, powerId) {
    const hero = await HeroRepository.getHeroById(heroId);
    if (!hero) throw new HeroError.NotFoundError("Le héros n'existe pas.");

    const power = await PowerRepository.getPowerById(powerId);
    if (!power) throw new HeroError.NotFoundError("Le pouvoir n'existe pas.");

    await HeroPowerRepository.addHeroPower(heroId, powerId);

    return { message: "Pouvoir ajouté au héros avec succès !" };
}

export async function addMissionToHero(heroId, missionId) {
    const hero = await HeroRepository.getHeroById(heroId);
    if (!hero) throw new HeroError.NotFoundError("Le héros n'existe pas.");

    const mission = await MissionRepository.getMissionById(missionId);
    if (!mission) throw new HeroError.NotFoundError("La mission n'existe pas.");

    await HeroMissionRepository.addHeroMission(heroId, missionId);

    return { message: "Mission ajoutée au héros avec succès !" };
}


export async function getHeroPowers(heroId) {
  const hero = await HeroRepository.getHeroById(heroId);
  if (!hero) throw new HeroError.NotFoundError("Le héros n'existe pas.");

  const powers = await HeroPowerRepository.getHeroPowers(heroId);
  return powers.length > 0 ? powers : { message: "Ce héros n'a aucun pouvoir." };
}

export async function getHeroMissions(heroId) {
  const hero = await HeroRepository.getHeroById(heroId);
  if (!hero) throw new HeroError.NotFoundError("Le héros n'existe pas.");

  const missions = await HeroMissionRepository.getHeroMissions(heroId);
  return missions.length > 0 ? missions : { message: "Ce héros n'a aucune mission." };
}