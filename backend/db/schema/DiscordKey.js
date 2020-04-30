/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('DiscordKey', {
    discord_key: {
      type: DataTypes.STRING(20),
      allowNull: false,
      primaryKey: true
    },
    fk_spieler: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Spieler',
        key: 'id'
      }
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'DiscordKey'
  });
};
