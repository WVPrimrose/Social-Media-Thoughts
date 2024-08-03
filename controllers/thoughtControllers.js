const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thought = await Thought.find();
            res.json();
        }   catch(err) {
            return res.status(500).json(err)
        }
    },
    // get a single thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ id: req.params.thoughtId })
            .select('-_v');

            if(!thought) {
                return res.status(404).json( { message: 'No thought with that ID'})
            }
            res.json()
        }   catch (err) {
            return res.status(500).json(err)
        }
    },
    // create new thought
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            res.json(thought)
            console.log(thought)
        }   catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    },
    // update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { id: req.paramas.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true},
                
            );
            res.json(thought);
        }   catch (err) {
            res.status(500).json(err)
        }
        console.log(thought)
    },
    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ id: req.params.thoughtId });
            res.json()
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
            res.json()
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // delete a reaction
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndDelete()
            res.json()
            console.log(thought)
        }   catch (err) {
            res.status(500).json(err)
            console.log(err)
        }
    }
}