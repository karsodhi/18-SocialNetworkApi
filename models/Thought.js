const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      required:true,
      trim:true
    },
    email: {
      type: DataTypes.STRING,
      require:true,
      unique: true,
      match: [
        /.+@.+\..+/,"must be a valid email address"
      ],
    },
    thoughts:[{
      type: Schema.Types.ObjectId,
      ref:"Thought"
    }],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: "User"
    }],
  },
  {
    toJSON: {
      virtuals:true,
      getters:true
    },
    id:false,
  }
);
userSchema.virtual("friendCount").get(function(){
  return this.friends.length
})
const User= model("User", userSchema)
module.exports = User;

this.reactions.length