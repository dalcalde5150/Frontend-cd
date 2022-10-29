'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Job extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'id_user' });
      this.belongsTo(models.Event, { foreignKey: 'id_event' });
    }
  }
  Job.init({
    id_user: DataTypes.INTEGER,
    id_event: DataTypes.INTEGER,
    resultado: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Job',
  });
  return Job;
};