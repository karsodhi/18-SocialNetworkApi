const User = require('../models/User');

module.exports = {
// get all users
getAllUsers(req,res){
  User.find()
  .then((users)=> res.json(users))
  .catch((error) => res.status(500).json(error))
},
  //  Get all users
  // async getUsers(req, res) {
  //   try {
  //     const users = await User.find();
  //     res.json(users);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // },

  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err))

  },
  // Delete a user and associated apps
  deleteUser(req, res) {
    User.findOneAndRemove({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  },

  // update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID found" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err))
  },
}

