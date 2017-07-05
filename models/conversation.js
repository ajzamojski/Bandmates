//this table holds the conversation ID between users
module.exports = function(sequelize, DataTypes) {
  var Conversation = sequelize.define("Conversation", {
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
      unique: true,
      allowNull: false,
      validate: {
        len:[1]
      }
    }
  }, {
      classMethods: {
        associate: function(models) {
          Conversation.hasMany(models.Conversation_Reply, {
            foreignKey: {
              name: 'convReply_id',
              onDelete: "cascade"
            }
          })
        }
}});
  return Conversation;
};