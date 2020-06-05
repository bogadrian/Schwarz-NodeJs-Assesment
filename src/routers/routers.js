//Routes file

const express = require('express');

const router = express.Router();

const read = require('../router/read-file');
const company = require('../router/get-company');

// reaf - file route
router.route('/read-file').get(read.readFile);

// find the entries for a specific company router
router.route('/company').get(company.getCompany);

// find the entries for a specific company router
router.route('/orders').get(company.getOrdersByAddress);

module.exports = router;
