const { Router } = require('express');
const { User, Thought } = require('../models');
const router = Router();

router.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get a single user by _id and populate thoughts and friends
router.get('/users/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
            .populate('thoughts')
            .populate('friends');
        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST a new user
router.post('/users', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT to update a user by _id
router.put('/users/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true }
        );
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE user by _id
router.delete('/users/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        res.json(deletedUser);
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST to add a new friend to a user's friend list
router.post('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $push: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE to remove a friend from a user's friend list
router.delete('/users/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.UserId,
            { $pull: { friends: req.params.friendId } },
            { new: true }
        );
        res.json(user);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET single thought by _id
router.get('/thoughts/:thoughtId', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thoughtId);
        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// POST to create a new thought
router.post('/thoughts', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        // Push the created thought's _id to the associated user's thoughts array
        await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        res.json(newThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// PUT to update a thought by _id
router.put('/thoughts/:thoughtId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true }
        );
        res.json(updatedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// DELETE a thought by _id
router.delete('/thoughts/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(
            req.params.thoughtId
        );
        res.json(deletedThought);
    } catch (err) {
        res.status(400).json(err);
    }
});

// POST to create a reaction stored in a single thought's reactions array
// POST to create a reaction stored in a single thought's reactions array
router.post('/thoughts/:thoughtId/reactions', async (req, res) => {
    try {
        const mongoose = require('mongoose');
        const validReactionId = mongoose.Types.ObjectId(); // Generate a valid ObjectId

        const reaction = {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
            reactionId: validReactionId, // Include the valid ObjectId
        };

        const thought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            { $push: { reactions: reaction } },
            { new: true }
        );
        res.json(thought);
    } catch (err) {
        res.status(400).json(err);
    }
});


// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete(
    '/thoughts/:thoughtId/reactions/:reactionId',
    async (req, res) => {
        try {
            const thought = await Thought.findByIdAndUpdate(
                req.params.thoughtId,
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { new: true }
            );
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    }
);

module.exports = router;
