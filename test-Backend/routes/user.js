const express = require('express');
const { getallUsers, getUser, updateUser } = require('../src/controllers/user_controller');

const router = express.Router();

router.get('/',  getallUsers);

router.get('/:username',getUser);

router.put('/:username', updateUser)


module.exports = router;
