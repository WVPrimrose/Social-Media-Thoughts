const router = require ('express').Router();
const userRoutes = require('./user-routes')
const thoughtRoutes = require('./thoughts')

router.use('/user-routes', userRoutes)
router.use('/thoughts', thoughtRoutes)

module.exports = router;