const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
} = require('../../controller/userController');

// set up GET all and POST at api/users
router.route('/')
    .get(getAllUsers)
    .post(createUser);

// set up Get one, PUT and DELETE at api/users:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// add and DELETE a friend
router.route(':/id/friends/:friendsId')
    .post(addFriend)
    .delete(removeFriend);

module.exports = router;