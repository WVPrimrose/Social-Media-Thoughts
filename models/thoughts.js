const { Schema, model} = require('mongoose')
const reactionSchema = require('./reaction')
const dayjs = require('dayjs')

const thoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            min_length: 1,
            max_length: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: function(date) {
                return dayjs(date).format("MM/DD/YYYYTHH:mm:ss")
            }
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: true
    }
)

thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
})

const Thought = model('thought', thoughtsSchema);

module.exports = Thought;