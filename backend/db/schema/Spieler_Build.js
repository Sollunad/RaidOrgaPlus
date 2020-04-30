/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Spieler_Build', {
    fk_spieler: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Spieler',
        key: 'id'
      }
    },
    fk_class: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Klasse',
        key: 'id'
      }
    },
    fk_role: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Rolle',
        key: 'id'
      }
    },
    prefer: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'Spieler_Build'
  });
};
