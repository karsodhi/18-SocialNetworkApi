const { Schema, model, Types } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      allowNull: false,
      unique:true,
      required:true,
      trim:true
    },
    email: {
      type: String,
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
const User = model("User", userSchema)

module.exports = User;
