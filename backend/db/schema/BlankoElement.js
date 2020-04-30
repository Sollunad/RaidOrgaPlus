/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('BlankoElement', {
    fk_raid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Raid',
        key: 'id'
      }
    },
    fk_boss: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Encounter',
        key: 'id'
      }
    },
    position: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      primaryKey: true
    },
    fk_class: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      references: {
        model: 'Klasse',
        key: 'id'
      }
    },
    fk_role: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: '0',
      references: {
        model: 'Rolle',
        key: 'id'
      }
    }
  }, {
    tableName: 'BlankoElement'
  });
};
