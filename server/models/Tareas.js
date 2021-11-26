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

    fechaParaRealizar: {
      type: DataTypes.DATE,
      defaultValue: false,
    }

    
  });

  return Tareas;
};
