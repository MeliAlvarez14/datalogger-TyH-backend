'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sensor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sensor.belongsToMany(models.Usuario, {
      through: 'UsuarioSensores',
      foreignKey: 'sensorId'
    });
    }
  }
  Sensor.init({
    idDevice: DataTypes.STRING,
    laboratorio: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sensor',
  });
  return Sensor;
};