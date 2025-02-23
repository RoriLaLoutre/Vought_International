import { PowerService } from "../services/index.service.js";

export async function getAllPowers(req, res , next) {
  try {
    const powers = await PowerService.getAllPowers();
    res.json(powers);
    // res.send("<h1>Liste des pouvoirs: </h1>" + JSON.stringify(powers))
  } catch (error) {
    next(error)
  }
}

export async function getPowerById(req, res , next) {
  try {
    const id = req.params.id;
    const nom_pouvoir = await PowerService.getPowerById(id);
    res.json(nom_pouvoir);
  } catch (error) {
    next(error)
  }
}

export async function createPower(req, res , next) {
  try {
    const { nom_pouvoir,description_pouvoir } = req.body;
    const newPower = await PowerService.createPower({
      nom_pouvoir,
      description_pouvoir,
    });
    res.json(newPower);
  } catch (error) {
    next(error)
  }
}

export async function updatePower(req, res , next) {
  try {
    const id = req.params.id;
    const { nom_pouvoir,description_pouvoir  } = req.body;
    const updatedPower = await PowerService.updatePower(id, {
      nom_pouvoir,
      description_pouvoir,
    });
    res.json(updatedPower);
  } catch (error) {
    next(error)
  }
}

export async function deletePower(req, res , next) {
  try {
    const id = req.params.id;
    const deletedPower = await PowerService.deletePower(id);
    res.json(deletedPower);
  } catch (error) {
    next(error)
  }
}

export async function restorePower(req, res , next) {
  try {
    const id = req.params.id;
    const restoredPower = await PowerService.restorePower(id);
    res.json(restoredPower);
  } catch (error) {
    next(error)
  }
}
