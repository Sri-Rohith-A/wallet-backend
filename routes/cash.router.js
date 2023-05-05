const router = require("express").Router();
const authMiddleware = require("../middleware/auth");
const cashControllers =  require("../controllers/cash.controller");
const { validateSearchEmployee } = require("../middleware/cash.validator"); 

router.get("/bucket-list", authMiddleware.verifyToken, cashControllers.getCashTypes);
router.get("/search-employee", authMiddleware.verifyToken, validateSearchEmployee, cashControllers.searchEmployee);
router.get("/cdw", authMiddleware.verifyToken, cashControllers.getDefaultCdwCash);
router.get("/events", authMiddleware.verifyToken, cashControllers.getEvents);
router.get("/maternity", authMiddleware.verifyToken, cashControllers.getDefaultMaternityCash);
router.post("/", );

module.exports = router;