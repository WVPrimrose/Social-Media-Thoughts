const router = require('express').Router()
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    getThoughtByReaction,
    createReaction,
    deleteReaction
} = require('../../controllers/thoughtControllers.js')

router.route('/').get(getThoughts).post(createThought);

router 
.route('/:id')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought)

router.route('/:thoughtId/reactions').get(getThoughtByReaction)
router
.post(createReaction)
.delete(deleteReaction)
module.exports = router;