module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[1]
      }
    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len:[6]
      }
    },
    profilePic: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    instruments: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    styles: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    experience: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    looking_for: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    hobbies: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
  });
  return User;
};

var bCrypt = require("bcrypt-nodejs");

// module.exports = function(sequelize, DataTypes) {
//   var User = sequelize.define("User",
//   {
//     firstName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     lastName: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     // Giving the Author model a name of type STRING
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },
//     // Giving the Author model a name of type STRING
//     email: {
//       type: DataTypes.STRING,
//       allowNull: false
//     },

//     password: {
//       type: DataTypes.STRING,
//       allowNull: false
//     }
//   },

//   {
//     // prevents pluralization of the table and prevents 'createdAt' and 'updatedAt' columns.
//     freezeTableName: true,
//     timestamps: false
//     // classMethods: {
//     //     generateHash: function(password) {
//     //         return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
//     //     },
//     //     validPassword: function(password) {
//     //         return bCrypt.compareSync(password, this.password);
//     //     }
//     // }
//   }

//   );
//   return User;
// };

