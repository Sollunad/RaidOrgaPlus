/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('PasswordReset', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    fk_spieler: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Spieler',
        key: 'id'
      }
    },
    token: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'PasswordReset'
  });
};
