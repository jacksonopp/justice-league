module.exports = function(sequelize, DataTypes) {
  const Matches = sequelize.define("Matches", {
    user1: {
      type: DataTypes.INTEGER,
      notEmpty: true
    },
    user2: {
      type: DataTypes.INTEGER,
      notEmpty: true
    }
  });
  return Matches;
};
