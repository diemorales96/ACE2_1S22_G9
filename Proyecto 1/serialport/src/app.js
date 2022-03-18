const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const http = require("http");

require("./database")
//const MedicionesRoutes = require("./routes/Mediciones.routes");
const socketIo = require("socket.io");
const controlador = require("./controllers/Mediciones.controller");
// Srial Port
const Medicion = require("./models/Mediciones.model");
const SerialPort = require("serialport");
const ReadLine = require("@serialport/parser-readline");
var sd = require('silly-datetime')
//Cambia para los otros el puerto
//const port = new SerialPort("COM7", { baudRate: 9600 });
//const parser = port.pipe(new ReadLine({ delimiter: "\n" }));


const app = express();
const puerto = config.PORT;

const corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Welcome to my API!"));



/*port.on("open", () => {
	console.log("Se abrió la comunicación");
});
*/
let datos;


/*
let obj ;
parser.on("data", (data) => {
	var time=sd.format(new Date(), 'MMM DD, YYYY HH:mm:ss');
	datos = "{ \"Fecha\":" +"\""+time.toString()+"\"" + ",";
	datos += data;
	obj = JSON.parse(datos);
	console.log(obj);
    const newMedicion = new Medicion(obj);
    //newMedicion.save(); 
});*/

var server = http.createServer(app);
const io = socketIo(
    server,
    {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        transports: ["websocket", "polling"],
      },
    },
    (cors_allowed_origins = "http://localhost:3000")
);

let interval;

io.on("connection", function (socket) {
    console.log("Made socket connection");
    if (interval) {
      clearInterval(interval);
    }
    if (socket.connected) {
      socket.on("medicion", function (data) {
        interval = setInterval(() => {
          if (socket.connected) {
            getData();
          } else {
            clearInterval(interval);
          }
        }, 4000);
      });

      socket.on("disconnect", function (data) {
        console.log("Socket Disconnected");
        socket.disconnect();
        socket.connected = false;
      });
    }
});



async function getData() {
    console.log("Data Emit")
    const messageData = await controlador.getData();
    io.emit("medicion", messageData);
}

server.listen(puerto, () => console.log(`listening on port ${puerto}!`));