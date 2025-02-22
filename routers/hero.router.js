import express from "express";
import { HeroController , MissionController,PowerController } from "../controllers/index.controller.js";

const router = express.Router()

router.get("/powers", PowerController.getAllPowers);
router.get("/mission", MissionController.getAllMissions); // Liste des missions

router.get("/", HeroController.getAllHeroes);
router.get("/:id", HeroController.getHeroById);
router.post("/", HeroController.createHero);
router.put("/:id", HeroController.updateHero);
router.delete("/:id", HeroController.deleteHero);
router.patch("/:id/restore", HeroController.restoreHero)

// Routes pour gérer les missions

export default router;


