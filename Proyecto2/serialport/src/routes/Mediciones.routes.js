const { Router } = require("express");
const router = Router();
const {
  getData,
} = require("../controllers/Mediciones.controller");


router.get("/getdata", getData);

module.exports = {
    routes: router,
};