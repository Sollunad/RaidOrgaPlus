/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Spieler_Termin', {
    fk_spieler: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Spieler',
        key: 'id'
      }
    },
    fk_termin: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Termin',
        key: 'id'
      }
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'Spieler_Termin'
  });
};
