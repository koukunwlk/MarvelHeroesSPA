const { Router } = require("express");
const HeroController = require("./controllers/HeroController");
const routes = Router();

routes.get("/", HeroController.index);

module.exports = routes;
