module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    first_name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    last_name: {
      type: DataTypes.STRING,
      notEmpty: true
    },
    username: {
      type: DataTypes.STRING
    },
    about: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_login: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active"
    }
  });
  return User;
};
