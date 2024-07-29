const { Schema, model } = require('mongoose')

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function(v) {
                  return /\d{3}-\d{3}-\d{4}/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
              },            
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            },
        ],
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

// want to validate if the email matches
// create error message if the email doesn't match
// wantt o make sure we save the email (regex... maybe)


const User = model('user', userSchema)


module.exports = User