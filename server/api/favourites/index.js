const router = require('express').Router();
const favouriteController = require('./favourite.controller');

router.post('/', favouriteController.new);

router.get('/favourites/:landscapeId', favouriteController.list);

module.exports = router;
