/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Aufstellung', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fk_termin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Termin',
        key: 'id'
      }
    },
    fk_boss: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Encounter',
        key: 'id'
      }
    },
    is_cm: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    success: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    report: {
      type: DataTypes.STRING(72),
      allowNull: true
    }
  }, {
    tableName: 'Aufstellung'
  });
};
