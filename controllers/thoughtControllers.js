const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find().populate('reactions');
            res.json(thought);
        }   catch(err) {
            res.status(500).json(err)
        }
    },
    // get a single thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id }).populate('reactions')
            .select('-_v');
            
            if(!thought) {
                return res.status(404).json( { message: 'No thought with that ID'})
            }
            res.json(thought)
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // create new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought)
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true},
                
            );
            res.json(thought);
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.id },
                { new: true}
            );
            res.send('Deleted thought')
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // get thought by reaction
    async getThoughtByReaction(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.id})
            res.json()
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: {reactions: req.params.reactionId}},
                { new: true }
            )
            res.json(thought)
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: {reactions: req.params.reactionId}},
                { new: true}
            )
            res.send('Deleted Reaction')
            console.log(thought)
        }   catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    }
}