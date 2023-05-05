const router = require("express").Router();
const configControllers = require("../controllers/config.controller");
const authMiddleware = require("../middleware/auth");
const {validateConfig} = require("../middleware/config.validator");

router.get("/", authMiddleware.verifyToken, configControllers.getConfigs);

router.patch("/", validateConfig, authMiddleware.verifyToken, configControllers.modifyConfigs);

module.exports = router;
