const router = require('express').Router();
const favouriteController = require('./favourite.controller');

router.post('/favourite', favouriteController.new);

router.get('/favourites/:landscapeId', favouriteController.list);

module.exports = router;
