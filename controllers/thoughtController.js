const res = require('express/lib/response');
const { Thought, User } = require('../models')

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err))
    },
    // get single thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought ? res.status(404).json({ message: "No thought found with that ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
    // create thought
    createThought({ body }, res) {
        Thought.create(body)
            .then(thoughtData => {
                User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: thoughtData._id } },
                    { new: true }
                )
                    .then(userData => {
                        if (!userData) {
                            res.status(404).json({ message: 'Thought created but no user found with this id' });
                            return;
                        }
                        res.json(userData);
                    })
                    .catch(err => res.json(err));
            })
            .catch(err => res.status(400).json(err));
    },



    //update thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID!" })
                    : res.json(thought)
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    //delete thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID!" })
                    : res.json({ message: "Thought successfully deleted!" })

            )

        User.findOneAndUpdate(
            { username: req.params.thoughtId.username },
            { $pull: { thoughts: req.params.thoughtId } }
        )
            .catch((err) => res.status(500).json(err))
    },
    // create reaction
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $addToSet: { reactions: body } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID!" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought found with that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err))
    },
};