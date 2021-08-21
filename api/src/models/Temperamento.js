const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperamento', {
    id: {
        type: DataTypes.INTEGER,
              primaryKey: true,
              autoincrement: true,
      },  
    nombre: {
              type: DataTypes.STRING,
    },  
  },
  {
    timestamps: false,
  },
  )};
