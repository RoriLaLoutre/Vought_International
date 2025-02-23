import Hero from "../models/hero.model.js";
import HeroPower from "../models/heroPower.model.js";
import Power from "../models/power.model.js";

export async function addHeroPower(heroId, powerId) {
    return await HeroPower.create({ id_hero: heroId, id_pouvoir: powerId });
}



export async function getHeroPowers(heroId) {
    return await Power.findAll({
      include: {
        model: Hero,
        as: "heroes",
        through: HeroPower,
        where: { id_hero: heroId },
        attributes: [], // ne pas récupérer les attributs du héros
      },
      attributes: ['id_pouvoir', 'nom_pouvoir', 'description_pouvoir'],
    });
  }