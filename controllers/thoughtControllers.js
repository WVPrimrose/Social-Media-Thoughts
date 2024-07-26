const { ObjectId } = require('mongoose').Types;
const { User, Thoughts } = require('../models');

module.exports = {
    // get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find();
            res.json();
        }   catch(err) {
            return res.status(500).json(err)
        }
    },
    // get a single thought by id
    async getSingleThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
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
            const thought = await Thoughts.create(req.body);
            res.json(thought)
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // update thought by id
    async updateThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndUpdate(
                {_id: req.paramas.thoughtId},
                { $set: req.body },
                { runValidators: true, new: true}
            );
            res.json(thought);
        }   catch (err) {
            res.status(500).json(err)
        }
    },
    // delete thought by id
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndDelete({_id: req.params.thoughtId});
            res.json()
        }   catch (err) {
            res.status(500).json(err)
        }
    }    
}