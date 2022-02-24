const Medicion = require("../models/Mediciones.model");
const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");
var sd = require('silly-datetime')

const port = new SerialPort("COM6", { baudRate: 9600 });
const parser = port.pipe(new ReadLine({ delimiter: "\n" }));

port.on("open", () => {
	console.log("Se abrió la comunicación");
});

let datos;

let obj ;
parser.on("data", (data) => {
	var time=sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
	datos = "{ \"Fecha\":" +"\""+time.toString()+"\"" + ",";
	datos += data;
	obj = JSON.parse(datos);
	var a = obj.TemperaturaInterna;
	if(a != 0){
		console.log(data);
    const newMedicion = new Medicion(obj);
    newMedicion.save();
	}
});

async function addData(req, res, next) {
  try {
    if(obj.TemperaturaInterna != 0){

      const newMedicion = new Medicion(obj);
      await newMedicion.save();
      
      res.json({
        message: "Dato registrado",
        result: newMedicion,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error en el registro de datos",
    });
  }
}

async function addData(req, res, next) {
  try {
     
      res.json({
        events: [
          obj,
        ],
      });
    
  } catch (error) {
    res.status(500).json({
      message: error.message || "Error en el registro de datos",
    });
  }
}




module.exports = {
  addData,
};