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
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      await Application.deleteMany({ _id: { $in: user.applications } });
      res.json({ message: 'User and associated apps deleted!' })
    } catch (err) {
      res.status(500).json(err);
    }
  },

async updateUser(req,res){
  try {
    const user = await User.findOneAndUpdate(
      {_id: req.params.userId},
       {$set: req.body},
       {runValidators:true, new:true}
       );

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }
    res.json({ message: 'User is updated!' })
  } catch (err) {
    res.status(500).json(err);
  }
  }
};

