const { Schema, model } = require('mongoose');

// Create User Schema
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid email address']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

// Create a virtual called 'friendCount''
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// Create User model
const User = model('User', userSchema);

module.exports = User;
