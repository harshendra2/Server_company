const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const config = require("../config/config");

const verifyToken = require("../middleware/auth");

router.post("/user/register", controller.userregister);
router.post("/user/login", controller.userLogin);
router.post("/user/create", controller.CreateUser);
router.get("/user/getall", controller.getallUser);
router.post("/user/delete", controller.DeleteUsers);
router.post("/user/get", controller.GetUsers);
router.put("/user/edit", controller.EditUser);

module.exports = router;