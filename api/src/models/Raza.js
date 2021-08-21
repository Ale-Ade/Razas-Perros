const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Raza', {
    id: {
      type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false, //* Campo obligatorio, no puede ser nulo este campo
    },
    nombre: {
      type: DataTypes.STRING,
            allowNull: false,
    },
    altura: {
      type: DataTypes.STRING,
            allowNull: false,
    },
    peso: {
      type: DataTypes.STRING,
            allowNull: false,
    },
    Vida: {
      type: DataTypes.STRING,
            allowNull: false,
    },
  },
  { 
    timestamps: false 
  },
  )};
