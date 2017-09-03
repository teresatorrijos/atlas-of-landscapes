const router = require('express').Router();
const mapController = require('./map.controller');

router.get('/allmaps', mapController.list);

module.exports = router;
