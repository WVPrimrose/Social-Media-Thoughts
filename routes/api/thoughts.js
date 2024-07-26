const router = require('express').Router()
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thoughtControllers.js')

router.route('/').get(getThoughts).post(createThought);

router 
.route('/:id')
.get(getSingleThought)
.put(updateThought)
.deleteUser(deleteThought)

module.exports = router;