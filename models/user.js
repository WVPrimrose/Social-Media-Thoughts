const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trimmed: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            
        },
        thoughts: {},
        friends: [{ type: Schema.Types.ObjectId, ref: 'friends'}],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: true,
    }

)

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
})

const User = model('user', userSchema)

module.exports = User