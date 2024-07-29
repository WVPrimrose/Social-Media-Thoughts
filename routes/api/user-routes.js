const router = require('express').Router
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
} = require('../../controllers/userControllers.js');

router.route('/').get(getUsers).post(createUser);
router 
.route('/:id')
.get(getSingleUser)
.put(updateUser)
.deleteUser(deleteUser)

router.route(':userId/friends/:friendId').get(getUserByFriend)
module.exports = router;