/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AufstellungElement', {
    fk_aufstellung: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Aufstellung',
        key: 'id'
      }
    },
    position: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    fk_spieler: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'Spieler',
        key: 'id'
      }
    },
    fk_class: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'Klasse',
        key: 'id'
      }
    },
    fk_role: {
      type: DataTypes.BIGINT,
      allowNull: true,
      defaultValue: '0',
      references: {
        model: 'Rolle',
        key: 'id'
      }
    }
  }, {
    tableName: 'AufstellungElement'
  });
};
