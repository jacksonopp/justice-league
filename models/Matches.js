module.exports = function(sequelize, DataTypes) {
  const Matches = sequelize.define("Matches", {
    user1: {
      type: DataTypes.INTEGER,
      notEmpty: true
    },
    user2: {
      type: DataTypes.INTEGER,
      notEmpty: true
    },
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    yes_or_no: {
      type: DataTypes.BOOLEAN,
      notEmpty: true
    }
  });
  return Matches;
};
