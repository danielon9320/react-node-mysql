module.exports = (sequelize, DataTypes) => {
  const AreaTrabajos = sequelize.define("AreaTrabajos", {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  AreaTrabajos.associate = (models) => {
    AreaTrabajos.hasMany(models.Tareas, {
      onDelete: "cascade",
    });

    AreaTrabajos.hasMany(models.Users, {
      onDelete: "cascade",
    });
  };

  return AreaTrabajos;
};
