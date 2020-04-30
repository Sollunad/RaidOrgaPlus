/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Rolle', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    abbr: {
      type: DataTypes.CHAR(1),
      allowNull: false
    }
  }, {
    tableName: 'Rolle'
  });
};
