const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
require("./database")
const MedicionesRoutes = require("./routes/Mediciones.routes");

const app = express();
const puerto = config.PORT;

const corsOptions = { origin: true, optionsSuccessStatus: 200 };
app.use(cors(corsOptions));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("Welcome to my API!"));
app.use("/api", MedicionesRoutes.routes);

app.listen(puerto, () => console.log(`listening on port ${puerto}!`));