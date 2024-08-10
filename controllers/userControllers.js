const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().populate('thoughts');
            res.json(users);
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).populate('thoughts')
                .select('-_v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json(user)
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // create user
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            res.json(user);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });
            res.send('Deleted user!')
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get user by friend
    async getUserByFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.friendId })
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create friend
    async createFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true })
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // delete friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId }},
                { runValidators: true, new: true }
            )
            res.json(user)
        } catch (err) {
            res.status(500).json(err)

        }
    }
}