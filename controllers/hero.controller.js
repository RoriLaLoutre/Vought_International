import { HeroService } from "../services/index.service.js";

export async function getAllHeroes(req, res , next) {
  try {
    const heroes = await HeroService.getAllHeroes();
    res.json(heroes);
    // res.send("<h1>Liste des héros: </h1>" + JSON.stringify(heroes))
  } catch (error) {
    next(error)
  }
}

export async function getHeroById(req, res , next) {
  try {
    const id = req.params.id;
    const hero = await HeroService.getHeroById(id);
    res.json(hero);
  } catch (error) {
    next(error)
  }
}

export async function createHero(req, res , next) {
  try {
    const { alias, identity, powerDate } = req.body;
    const newHero = await HeroService.createHero({
      alias,
      identity,
      powerDate,
    });
    res.json(newHero);
  } catch (error) {
    next(error)
  }
}

export async function updateHero(req, res , next) {
  try {
    const id = req.params.id;
    const { alias, identity, powerDate } = req.body;
    const updatedHero = await HeroService.updateHero(id, {
      alias,
      identity,
      powerDate,
    });
    res.json(updatedHero);
  } catch (error) {
    next(error)
  }
}

export async function deleteHero(req, res , next) {
  try {
    const id = req.params.id;
    const deletedHero = await HeroService.deleteHero(id);
    res.json(deletedHero);
  } catch (error) {
    next(error)
  }
}

export async function restoreHero(req, res , next) {
  try {
    const id = req.params.id;
    const restoredHero = await HeroService.restoreHero(id);
    res.json(restoredHero);
  } catch (error) {
    next(error)
  }
}


export async function addPowerToHero(req, res, next) {
    try {
        const { heroId, powerId } = req.body;
        const result = await HeroService.addPowerToHero(heroId, powerId);
        res.json(result);
    } catch (error) {
        next(error);
    }
}



export async function addMissionToHero(req, res, next) {
    try {
        const { heroId, missionId } = req.body;
        const result = await HeroService.addMissionToHero(heroId, missionId);
        res.json(result);
    } catch (error) {
        next(error);
    }
}


export async function getHeroPowers(req, res, next) {
  try {
      const heroId = req.params.id;
      const powers = await HeroService.getHeroPowers(heroId);
      res.json(powers);
  } catch (error) {
      next(error);
  }
}

export async function getHeroMissions(req, res, next) {
  try {
      const heroId = req.params.id;
      const missions = await HeroService.getHeroMissions(heroId);
      res.json(missions);
  } catch (error) {
      next(error);
  }
}
