const router = require ('express').Router();
const userRoutes = require('./users')
const thoughtRoutes = require('./thoughts')

router.use('/users', userRoutes)
router.use('/thought', thoughtRoutes)

module.exports = router;