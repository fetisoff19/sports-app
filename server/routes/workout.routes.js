const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const workoutController = require('../controllers/workoutController')


// router.get('', authMiddleware, workoutController.getWorkouts)
router.post('/upload', authMiddleware, workoutController.uploadWorkout)

// router.post('/avatar', authMiddleware, fileController.uploadAvatar)
// router.delete('/avatar', authMiddleware, fileController.deleteAvatar)
// router.get('', authMiddleware, fileController.getFiles)
// router.get('/download', authMiddleware, fileController.downloadFile)
// router.get('/search', authMiddleware, fileController.searchFile)
// router.delete('/', authMiddleware, fileController.deleteFile)

module.exports = router