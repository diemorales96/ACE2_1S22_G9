const Medicion = require("../models/Mediciones.model");

async function getData() {
  try {
    const tasks = await Medicion.find();
    return tasks;
    
  } catch (error) {
    return {"Message":"Error"}
  }
}

module.exports = {
  getData,
};