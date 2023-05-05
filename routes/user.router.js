const router = require("express").Router();
const userControllers = require("../controllers/user.controller");
const authMiddleware = require("../middleware/auth");
const validator = require("../middleware/user.validator");

router.get("/locations-bu", authMiddleware.verifyToken, userControllers.getLocationsAndBu);

router.get("/:employeeId", authMiddleware.verifyToken, validator.validateEmpId, userControllers.getUser);

router.patch("/:employeeId", authMiddleware.verifyToken, validator.validateUserUpdateData, userControllers.updateUser);

router.patch("/:employeeId/stop-maternity-cash", authMiddleware.verifyToken, userControllers.stopMaternityCash);

router.post("/", authMiddleware.verifyToken, validator.validateUser, userControllers.addUser);

module.exports = router;
