const router = require('express').Router()
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    getUserByFriend,
    createFriend,
    deleteFriend
} = require('../../controllers/userControllers.js');

router.route('/').get(getUsers).post(createUser);
router 
.route('/:id')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser)

router.route('/:id/friends/:friendId').get(getUserByFriend)
.put(createFriend)
.delete(deleteFriend)
module.exports = router;