const router = require('express').Router
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
.deleteUser(deleteUser)

router.route(':userId/friends/:friendId').get(getUserByFriend)
router
.post(createFriend)
.delete(deleteFriend)
module.exports = router;