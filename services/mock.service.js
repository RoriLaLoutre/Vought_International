import { HeroService, MissionService } from "./index.service.js";
import heroesMock from "../mocks/hero.mock.js";
import missionMock from "../mocks/mission.mock.js";


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
    for (const mission of missionMock) {
        try {
            const newMission = await MissionService.createMission(mission);
            console.log(newMission)
        } catch (error) {
            console.log("[ERROR]" ,error.message);
        }
    }
    console.log("============End Mocking============");
    return await HeroService.getAllHeroes();
}