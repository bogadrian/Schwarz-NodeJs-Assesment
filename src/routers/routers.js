//Routes file

const express = require('express');

const router = express.Router();

const handlers = require('../fileRouter/read-file');

// reaf - file route
router.route('/read-file').get(handlers.readFile);

module.exports = router;
