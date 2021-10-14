module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    //structure 4 table
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  });

  return Posts;
};
