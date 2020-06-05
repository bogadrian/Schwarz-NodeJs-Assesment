//Routes file

const express = require('express');

const router = express.Router();

// import the handlers
const read = require('../controllers/read-file');
const company = require('../controllers/get-company');

// read file router
router.route('/read-file').get(read.readFile);

// find the entries for a specific company router
router.route('/company').get(company.getCompany);

// find the entries for a specific company router
router.route('/orders').get(company.getOrdersByAddress);

// find the entries for a specific company router
router.route('/delete-order').delete(company.deleteOrder);

// display how often an item has been orderd in descending order
router.route('/sort').get(company.sortByOrder);

module.exports = router;
