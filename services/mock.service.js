import { HeroService } from "./index.service.js";
import heroesMock from "../mocks/hero.mock.js";

export async function initializeHeroMock() {
    console.log("============Start Mocking============");
    for (const hero of heroesMock) {
        try {
            const newHero = await HeroService.createHero(hero);
            console.log(newHero)
        } catch (error) {
            console.log("[ERROR]" ,error.message);
        }
    }
    console.log("============End Mocking============");
    return await HeroService.getAllHeroes();
}