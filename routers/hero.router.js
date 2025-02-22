import express from "express";
import { HeroController , MissionController,PowerController } from "../controllers/index.controller.js";

const router = express.Router()

// route pour gérer les pouvoirs
router.get("/powers", PowerController.getAllPowers);


router.get("/", HeroController.getAllHeroes);
router.get("/:id", HeroController.getHeroById);
router.post("/", HeroController.createHero);
router.put("/:id", HeroController.updateHero);
router.delete("/:id", HeroController.deleteHero);
router.patch("/:id/restore", HeroController.restoreHero)

// Routes pour gérer les mission

router.get("/mission", MissionController.getAllMissions);
router.get("/mission/:id", MissionController.getMissionById);
router.get("/mission/:nom_mission", MissionController.getMissionByName);
router.get("/mission/:status", MissionController.getAllMissionsByStatus);
router.get("/mission/:is_a_success", MissionController.getAllMissionsBySuccess);
router.post("/mission", MissionController.createMission);
router.put("/mission/:id", MissionController.updateMission);
router.delete("/mission/:id", MissionController.deleteMission);
router.patch("/mission/:id/restore", MissionController.restoreMission)
export default router;


