var bCrypt = require("bcrypt-nodejs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User",
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Giving the Author model a name of type STRING
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // Giving the Author model a name of type STRING
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },

  {
    // prevents pluralization of the table and prevents 'createdAt' and 'updatedAt' columns.
    freezeTableName: true,
    timestamps: false
    // classMethods: {
    //     generateHash: function(password) {
    //         return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    //     },
    //     validPassword: function(password) {
    //         return bCrypt.compareSync(password, this.password);
    //     }
    // }
  }

  );
  return User;
};
