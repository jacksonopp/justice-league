module.exports = function(sequelize, DataTypes) {
  var PrivateTables = sequelize.define("PrivateTables", {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    actual_location: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    user_full_name: DataTypes.STRING,
    img_url: DataTypes.STRING
    // id_token: DataTypes.TEXT
  });
  return PrivateTables;
};
