const { Router } = require("express");
const router = Router();
const {
  addData,
} = require("../controllers/Mediciones.controller");

router.post("/data", addData);
router.get("/data", addData);

module.exports = {
    routes: router,
};