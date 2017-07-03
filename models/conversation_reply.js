//this table holds the messages associated with the conversation
module.exports = function(sequelize, DataTypes) {
  var Conversation_Reply = sequelize.define("Conversation_Reply", {
    reply: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
          len: [1]
      }
    },
    from_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    to_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false
    },
    con_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len:[1]
      }
    }
  }, {
      classMethods: {
        associate: function(models) {
          Conversation_Reply.belongsTo(models.Conversations, {
            foreignKey: {
              name: 'convReply_id',
              onDelete: "cascade"
            }
          })
        }
    }
  });
  return Conversation_Reply;
};