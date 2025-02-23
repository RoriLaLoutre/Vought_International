import HeroPower from "../models/heroPower.model.js";
import Power from "../models/power.model.js";

export async function addHeroPower(heroId, powerId) {
    return await HeroPower.create({ id_hero: heroId, id_pouvoir: powerId });
}

export async function getHeroPowers(heroId) {
    return await Power.findAll({
        include: {
            model: HeroPower,
            where: { id_hero: heroId }
        }
    });
}