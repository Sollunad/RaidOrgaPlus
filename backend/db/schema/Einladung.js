/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Einladung', {
    fk_raid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Raid',
        key: 'id'
      }
    },
    fk_spieler: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Spieler',
        key: 'id'
      }
    }
  }, {
    tableName: 'Einladung'
  });
};
