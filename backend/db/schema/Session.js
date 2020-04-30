/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Session', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Spieler',
        key: 'id'
      }
    },
    uuid: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    agent: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'Session'
  });
};
