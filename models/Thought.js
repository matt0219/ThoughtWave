const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        minlength: 1,
        maxlength: 280,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            reactionBody: {
                type: String,
                required: true,
                maxlength: 280
            },
            username: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
