const router = require("express").Router();
const userController = require('../controller/userController')

router.post('/createUser',userController.createUser)
router.get('/getAllUsers',userController.getAllUsers)
router.get('/getUserById/:id',userController.getUserById)
router.delete('/deleteUser/:id',userController.deleteUser)
router.post('/loginUser',userController.loginUser)


module.exports = router;