'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JobResult extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  JobResult.init({
    id_user: DataTypes.INTEGER,
    id_job: DataTypes.INTEGER,
    resultado: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'JobResult',
  });
  return JobResult;
};