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

    estado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },

    fechaDeAlta: {
      type: DataTypes.BIGINT,
      defaultValue: Date.now(),
    }

    
  });

  return Tareas;
};
