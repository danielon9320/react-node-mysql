const Users = require("./Users");

module.exports = (sequelize, DataTypes) => {
  const Tareas = sequelize.define("Tareas", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

 

  return Tareas;
};
