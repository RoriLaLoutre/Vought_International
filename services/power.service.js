import * as PowerRepository from "../repositories/power.repository.js";
import { PowerError } from "../errors/index.error.js";

export async function createPower({ nom_pouvoir, description_pouvoir }) {
  if (!nom_pouvoir || nom_pouvoir.length < 3) {
    throw new PowerError.BadRequestError("Le nom du pouvoir doit comporter au moins 3 caractères.");
  }

  if (await PowerRepository.powerExists(nom_pouvoir)) {
    throw new PowerError.ConflictError("Le pouvoir existe déjà.");
  }

  const power = await PowerRepository.createPower({ nom_pouvoir, description_pouvoir });
  return power.dataValues;
}

export async function getPowerById(id) {
  const power = await PowerRepository.getPowerById(id);
  if (!power) {
    throw new PowerError.NotFoundError("Le pouvoir n'existe pas.");
  }

  return power;
}

export async function getPowerByName(nom_power) {
  const power = await PowerRepository.getPowerByName(nom_power);
  if (!power) {
    throw new PowerError.NotFoundError("Le pouvoir n'existe pas avec ce nom.");
  }

  return power;
}

export async function updatePower(id, { nom_power, description_pouvoir }) {
  const power = await PowerRepository.getPowerById(id);
  if (!power) {
    throw new PowerError.NotFoundError("Le pouvoir n'existe pas.");
  }

  return await PowerRepository.updatePower(id, { nom_power, description_pouvoir });
}

export async function deletePower(id) {
  const power = await PowerRepository.getPowerById(id);
  if (!power) {
    throw new PowerError.NotFoundError("Le pouvoir n'existe pas.");
  }

  return await PowerRepository.deletePower(id);
}

export async function restorePower(id) {
  const deletedPower = await PowerRepository.getDeletedPowerById(id);
  if (!deletedPower) {
    throw new PowerError.NotFoundError("Le pouvoir supprimé n'existe pas.");
  }

  return await PowerRepository.restorePower(id);
}

export async function getAllPowers() {
  const powers = await PowerRepository.getAllPowers();
  return powers;
}

export async function getAllPowersWithDeleted() {
  const powers = await PowerRepository.getAllPowersWithDeleted();
  return powers;
}

export async function getAllDeletedPowers() {
  const powers = await PowerRepository.getAllDeletedPowers();
  return powers;
}
