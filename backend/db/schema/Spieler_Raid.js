/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Spieler_Raid', {
    fk_spieler: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Spieler',
        key: 'id'
      }
    },
    fk_raid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Raid',
        key: 'id'
      }
    },
    role: {
      type: DataTypes.INTEGER(4),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'Spieler_Raid'
  });
};
