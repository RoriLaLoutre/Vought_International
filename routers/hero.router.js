import express from "express";
import { HeroController , MissionController,PowerController } from "../controllers/index.controller.js";

const router = express.Router()

// route pour gérer les pouvoirs
router.get("/powers", PowerController.getAllPowers);
router.get("/powers/:id", PowerController.getPowerById);
router.post("/powers", PowerController.createPower);
router.put("/powers/:id", PowerController.updatePower);
router.patch("/powers/:id/restore", PowerController.restorePower)

// Routes pour gérer les héros

router.get("/", HeroController.getAllHeroes);
router.get("/:id", HeroController.getHeroById);
router.post("/", HeroController.createHero);
router.put("/:id", HeroController.updateHero);
router.delete("/:id", HeroController.deleteHero);
router.patch("/:id/restore", HeroController.restoreHero)


// Routes pour gérer les mission

router.get("/missions", MissionController.getAllMissions);
router.get("/mission/:id", MissionController.getMissionById);
router.get("/mission/:nom_mission", MissionController.getMissionByName);
router.get("/mission/:status", MissionController.getAllMissionsByStatus);
router.get("/mission/:is_a_success", MissionController.getAllMissionsBySuccess);
router.post("/mission", MissionController.createMission);
router.put("/mission/:id", MissionController.updateMission);
router.patch("/mission/:id/restore", MissionController.restoreMission)

// Routes pour gérer les relations entre les héros et les missions/powers

router.post("/hero-power", HeroController.addPowerToHero);
router.post("/hero-mission", HeroController.addMissionToHero);
router.get("/:id/powers", HeroController.getHeroPowers);
router.get("/:id/missions", HeroController.getHeroMissions);
export default router;


