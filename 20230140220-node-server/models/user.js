const { Model, DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  class User extends Model {
    
    static associate(models) {
      User.hasMany(models.Presensi, { 
        foreignKey: "userId", 
        as: "presensi", 
        onDelete: "CASCADE",
      });
    }
  }

  User.init(
    {
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM("admin", "mahasiswa"),
        defaultValue: "mahasiswa",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "Users", // opsional, defaultnya pluralisasi
    }
  );

  return User;
};