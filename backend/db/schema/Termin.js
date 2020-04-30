/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Termin', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    fk_raid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Raid',
        key: 'id'
      }
    },
    isArchived: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    isLocked: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    preview: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'Termin'
  });
};
