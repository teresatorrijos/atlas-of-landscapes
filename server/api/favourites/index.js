const router = require('express').Router();
const favouriteController = require('./favourite.controller');

router.post('/', favourite.controller.new);

router.get('/favourites/:landscapeId', favourite.controller.list);

module.exports = router;
