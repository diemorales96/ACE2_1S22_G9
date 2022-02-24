const { Schema, model } = require("mongoose");

const MedicionSchema = new Schema(
    {
      Fecha: { type: String, default: "None" },
      CO2: { type: Number, default: "None" },
      Iluminacion: { type: Number, default: "male" },
      Humedad: { type: Number, default: 0 },
      TemperaturaInterna: { type: Number, default: "None" },
      TemperaturaExterna: { type: Number, default: "None" },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = model("Medicion", MedicionSchema, "mediciones");