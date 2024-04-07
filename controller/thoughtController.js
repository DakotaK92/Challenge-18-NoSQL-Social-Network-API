const { Thought, User } = require('../models');
const { populate } = require('../models/user');

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // GET one thought by it's ID, create thought to a User
    createThought(req, res) {
        Thought.create(req.body)
            .then((dbThoughtData) => {
                return User.findOneAndUpdate(
                    {_id:req.body.userID},
                    {$push:{ thoughts:dbThoughtData._id}},
                    {new:true}
                )
            })
            .then(userData => res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    // UPDATE Thought by it's ID
    updateThought(req, res) {
        Thought.findOneAndUpdate({
            _id: req.params.id
        },{
            $set: req.body
        },{
            runValidators: true,
            new: true
        }).then((thought) => {
            !thought ? res.status(404).json({ message: 'No Thought by ID' }) : res.json(thought);
        }).catch((err) => res.status(500).json(err));
    },

    // GET Thought by ID
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .then((dbThoughtData) => {
            // if no thought is found
            if (!dbThoughtData) {
                res.status(404).json({ message: "No Thought with this ID" });
                return;
            }
        res.json(dbThoughtData);
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // DELETE a Thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({_id: req.params.id})
            .then((thought) => {
                if(!thought){
                    res.status(404).json({message: 'No thought with that ID'}) 
                }
            return User.findOneAndUpdate(
                {_id:req.body.userID},
                {$pull:{thoughts:thought._id}},
                {new:true}
            )
        })
        .then(() => res.json({message: 'Thought and Reaction(s) are deleted!'}))
        .catch((err) => res.status(500).json(err));
    },

    // add Reaction
    addReaction(req, res) {
        console.log('You added a reaction!');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body} },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res
                    .status(404)
                    .json({ message: 'No friend found with that ID' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },

    //DELETE Reaction
    deleteReaction(req, res) {
        console.log(req.params)
            Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId} } },
                { runValidators: true, new: true }
            )
            .then((thought) =>
                !thought
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
}

module.exports = thoughtController;