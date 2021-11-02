const { Sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("Roles", {
      tipo: {
        type: DataTypes.ENUM('administrador', 'jefe', 'empleado')
      },
      descripcion: {
        type: DataTypes.STRING,
      }
    
    });
  
   
  
    return Roles;
  };
  