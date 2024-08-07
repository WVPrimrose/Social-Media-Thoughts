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

router.route('/:id/reactions').get(getThoughtByReaction)
.put(createReaction)
router.route('/:id/reactions/:reactionId')
.delete(deleteReaction)
module.exports = router;