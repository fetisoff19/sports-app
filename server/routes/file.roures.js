const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')

// router.post('', authMiddleware, fileController.createDir)
router.post('/upload', authMiddleware, fileController.uploadFile)
router.post('/edit', authMiddleware, fileController.editFile)
// router.post('/avatar', authMiddleware, fileController.uploadAvatar)
// router.delete('/avatar', authMiddleware, fileController.deleteAvatar)
router.get('', authMiddleware, fileController.getFiles)
router.get('/download', authMiddleware, fileController.downloadFile)
router.get('/polyline', authMiddleware, fileController.getPolyline)
router.get('/chartsdata', authMiddleware, fileController.getChartsData)
router.get('/powercurve', authMiddleware, fileController.getPowerCurve)
router.get('/search', authMiddleware, fileController.searchFile)
router.delete('/', authMiddleware, fileController.deleteFile)
router.delete('/all', authMiddleware, fileController.deleteFileAll)
router.delete('/user', authMiddleware, fileController.deleteUser)


module.exports = router