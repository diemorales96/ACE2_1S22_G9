const { Schema, model } = require("mongoose");

const MedicionSchema = new Schema(
    {
      Fecha: { type: String, default: "None" },
      Biogas: { type: Number, default: 0 },
      Temperatura: { type: Number, default: 0 },
      Estado: { type: Number, default: 0 },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  
    //"Biogas": valor ,"Temperatura": valor ,"estado": valor}

  module.exports = model("Medicion", MedicionSchema, "mediciones");