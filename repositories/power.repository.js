import Power from "../models/power.model.js";

export async function createPower({ nom_pouvoir , description_pouvoir }) {
  const power = await Power.create({ nom_pouvoir , description_pouvoir });
  return power;
}

export async function getPowerById(id) {
  const power = await Power.findByPk(id);
  if (!power) {
    return null;
  }

  return power;
}

export async function getPowerByName(nom_pouvoir){
    const power = await Power.findOne({ where: { nom_pouvoir } });
    if (!power) {
        return null;
      }
    
    return power;
}

export async function getDeletedPowerById(id) {
  const power = await Power.scope("deleted").findByPk(id);
  if (!power) {
    return null;
  }

  return power;
}

export async function updatePower(id, values) {
  const power = await getPowerById(id);
  if (!power) {
    return null;
  }

  return await power.update(values);
}

export async function deletePower(id) {
  const power = await getPowerById(id);
  if (!power) {
    return null;
  }

  return await updatePower(power.id, { isDeleted: true });
}

export async function getAllPowers() {
  return await Power.findAll();
}

export async function powerExists(nom_pouvoir) {
  const power = await Power.findOne({ where: { nom_pouvoir } });
  return Boolean(power);
}

export async function powerDeletedExists(nom_pouvoir) {
  const power = await Power.scope("deleted").findOne({ where: { nom_pouvoir } });
  return Boolean(power);
}

export async function getAllPowersWithDeleted() {
  await Power.scope("withDeleted").findAll();
}

export async function getAllDeletedPowers() {
  await Power.scope("deleted").findAll();
}

export async function restorePower(id) {
  const deletedPower = await getDeletedPowerById(id);
  
  if (!deletedPower || (await powerExists(deletedPower.alias))) {
    return null;
  }

  return await deletedPower.update({ isDeleted: false });
}