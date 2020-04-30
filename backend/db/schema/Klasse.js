/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Klasse', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    abbr: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
    isBase: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    fk_base: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Klasse',
        key: 'id'
      }
    }
  }, {
    tableName: 'Klasse'
  });
};
