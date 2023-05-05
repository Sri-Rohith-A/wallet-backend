const router = require("express").Router();
const authControllers = require("../controllers/admin.controller");
const { validateAdmin } = require("../middleware/login.validator");

router.post("/login", validateAdmin, authControllers.loginAdmin);

module.exports = router;
