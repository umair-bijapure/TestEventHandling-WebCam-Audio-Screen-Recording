const express = require('express');
const {  login, registerUser,CheckIfUsernameExists } = require('../src/controllers/auth_controller');

const router = express.Router();

// Route to register an organization

console.log("Step 2")


console.log("Step 333333")
router.post('/user/login', login);   


router.post('/check-if-username-exists',CheckIfUsernameExists)

router.post('/user', registerUser);
module.exports = router;
