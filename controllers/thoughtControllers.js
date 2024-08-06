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
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).populate('reactions')
            .select('-_v');
            
            if(!thought) {
                return res.status(404).json( { message: 'No thought with that ID'})
            }
            res.json(thought)
            console.log(thought)
        }   catch (err) {
            res.status(500).json(err)
            console.log(err)
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
                { _id: req.paramas.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true},
                
            );
            res.json(thought);
            console.log(thought)
        }   catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },
    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete(
                { _id: req.params.thoughtId },
                { new: true}
            );
            res.send('Deleted thought')
            console.log(thought)
        }   catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },
    // get thought by reaction
    async getThoughtByReaction(req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            res.json()
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // create a reaction
    async createReaction(req, res) {
        try {
            const thought = await Thought.create()
            res.json(thought)
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndDelete()
            res.send('Deleted Reaction')
            console.log(thought)
        }   catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    }
}