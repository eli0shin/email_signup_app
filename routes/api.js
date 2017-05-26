var express = require('express');
var router = express.Router();
var api = require('../controllers/api.js');

/*
 * GET
 */
router.get('/download/', api.list);

/*
 * GET
 */
router.get('/download:id', api.show);

/*
 * POST
 */
router.post('/', api.create);

/*
 * PUT
 */
router.put('/:id', api.update);

/*
 * DELETE
 */
router.delete('/:id', api.remove);

module.exports = router;
