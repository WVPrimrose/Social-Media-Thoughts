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
                  return /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
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
        friends: [{ type: Schema.Types.ObjectId, ref: 'user'}],
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