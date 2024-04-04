const req = require("express/lib/request");
const { Thought, User } = require("../models");

const userController = {
    // get all users
    getAllUsers(req,res) {
        User.find().then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    // create user
    createUser(req,res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .create((err) => res.status(500).json(err));
    },

    // update user by ID
    updateUser(req,res) {
        User.findOneAndUpdate({
            _id: req.params.id
        },{
            $set: req.body
        },{
            runValidate: true,
            new: true
        }).then((user) => {
            !user ? res.status(404).json({ message: 'No user found' }) : res.json(user);
        }).catch((err) => res.status(500).json(err));
    },

    // delete user
    deleteUser(req,res) {
        User.findOneAndDelete({ _id: req.params.id })
        .then((user) => ! user ? res.status(404)
        .json({ message: 'No user with that ID' }) : Thought.deleteMany({
            _id: {
                $in: user.thoughts
            }
        })).then(() => res.json({ message: 'User and associated apps deleted' }))
        .catch((err) => res.status(500).json(err));
    },

    // get User by ID
    getUserByID(req,res) {
        User.findOne({ _id: req.params.id })
        .then((user) => !user ? res.status(404).json({ message: 'No user with that ID' }) : res.json(user))
        .catch((err) => res => res.status(500).json(err));
    },

    // add a Friend
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(res.body);
        User.findOneAndUpdate({
            _id: req.params.id
        },{
            $addToSet: {
                friends: req.params.friendsID
            }
        },{
            runValidate: true,
            new: true
        }).then((user) => !user ? res.status(404).json({ message: 'No friend found with that ID' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
    },

    // remove a Friend
    removeFriend(req,res) {
        User.findOneAndUpdate({
            _id: req.params.id
        },{
            $pull: {
                friends: req.params.friendsID
            }
        },{
            runValidate: true,
            new: true
        }).then((user) => !user ? res.status(404).json({ message: 'No friend found with that ID' }) : res.json(user))
        .catch((err) => res.status(500).json(err));
    }
};

module.exports = userController