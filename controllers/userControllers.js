const { User } = require('../models');

module.exports = {
  // Get all users
  getUsers(req, res) {
    try {
      User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  },
  // Get a single user
  getSingleUser(req, res) {
    try {
      User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
    } catch (err) {
      console.error(err)
      res.status(500).json(err)
    }
  },
  // create a new user
  createUser(req, res) {
    try {
      User.create(req.body)
        .then((user) => res.json(user))
        .catch((err) => {
          console.error(err)
          res.status(500).json(err.message)
        });
    } catch (err) {
      console.error(err)
      res.status(500).json(err.message)
    }
   
  },
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        req.body,
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      } else {
        res.json(user);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
          
  // Delete a user and associated apps
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete(
        { _id: req.params.userId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true }
      );
      if (!user) {
        res.status(404).json({ message: 'No user with that ID' });
      }
      else {
        res.json({ message: 'User deleted'});
      }
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  addFriend(req, res) {
    const { userId, friendId } = req.params;

    User.findOneAndUpdate(
      { _id: userId },
      { $addToSet: { friends: friendId } },
      { new: true }
    )
      .populate('friends')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  deleteFriend(req, res) {
    const { userId, friendId } = req.params;

    User.findOneAndUpdate(
      { _id: userId },
      { $pull: { friends: friendId } },
      { new: true }
    )
      .populate('friends')
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};
