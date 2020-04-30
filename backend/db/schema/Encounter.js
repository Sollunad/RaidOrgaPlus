/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Encounter', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    abbr: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    apiname: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    wing: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'Wing',
        key: 'id'
      }
    },
    main: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    kp_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    has_cm: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: '0'
    }
  }, {
    tableName: 'Encounter'
  });
};
