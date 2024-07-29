const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            return res.status(500).json(err)
        }
    },
    // get single user
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-_v');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' })
            }

            res.json()
        } catch (err) {
            return res.status(500).json(err);
        }
    },
    // create user
    async createUser(req, res) {
        console.log("Anything")
        try {
            const user = await User.create(req.body);
            console.log(user)
            res.json(user);
        } catch (err) {
            console.log(err)
            res.status(500).json(err) 
        }
    },
    // update user
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
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
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            res.json()
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // get user by friend
    async getUserByFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            res.json(user)
            console.log(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    // create friend
    async createFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
            { $addToSet: {friends: req.params.friendId}})
            console.log(user)
            res.json(user)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    // delete friend
    async deleteFriend(req, res) {
        try {
            const user = await User.findOneAndDelete()
            res.json(user)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}