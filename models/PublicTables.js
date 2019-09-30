module.exports = function(sequelize, DataTypes) {
  var PublicTables = sequelize.define("PublicTables", {
    fake_name: DataTypes.STRING,
    general_location: DataTypes.STRING,
    age: DataTypes.INTEGER,
    about: DataTypes.STRING
    // id_token: DataTypes.TEXT
  });
  return PublicTables;
};
