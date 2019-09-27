module.exports = function(sequelize, DataTypes) {
  var PrivateTables = sequelize.define("PrivateTables", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    actual_location: DataTypes.STRING,
    contact: DataTypes.STRING
  });
  return PrivateTables;
};
