const router = require('express').Router();
const landscapesController = require('./landscape.controller');
const upload = require('../../config/multer');


router.get('/atlas', landscapesController.index);

router.post('/landscapes/new', upload.single('file'), landscapesController.new );

router.get('/landscapes/:id', landscapesController.get );

router.put('/landscapes/:id', landscapesController.edit );

router.delete('/landscapes/:id', landscapesController.delete );

module.exports = router;
