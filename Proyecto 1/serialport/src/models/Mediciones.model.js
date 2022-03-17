const { Schema, model } = require("mongoose");

const MedicionSchema = new Schema(
    {
      Fecha: { type: String, default: "None" },
      NivelAgua: { type: Number, default: 0 },
      Humedad: { type: Number, default: 0 },
      Turbidez: { type: Number, default: 0 },
      PH: { type: Number, default: 0 },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
  module.exports = model("Medicion", MedicionSchema, "mediciones");