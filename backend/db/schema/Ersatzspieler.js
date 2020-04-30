/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Ersatzspieler', {
    fk_termin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Termin',
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
    tableName: 'Ersatzspieler'
  });
};
