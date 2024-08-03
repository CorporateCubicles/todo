const express = require('express');
const router = express.Router();

const  { createUserController} = require('../controller/user.controller');

router.post('/createuser', createUserController );

module.exports = router;

