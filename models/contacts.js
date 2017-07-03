//this table holds the friendship/contact ID between users
module.exports = function(sequelize, DataTypes) {
  var Contacts = sequelize.define("Contacts", {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    }
  }, {
      classMethods: {
        associate: function(models) {
          Contacts.belongsTo(models.User, {
            foreignKey: {
              name: 'userContact_id',
              allowNull: false
            }
          })
        }
      }
  }
  );
  return Contacts;
};