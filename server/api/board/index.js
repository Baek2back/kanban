const express = require('express');
const router = express.Router();
const ctrl = require('./board.ctrl');

router.get('/', ctrl.fetch);
router.post('/', ctrl.insert);
router.patch('/', ctrl.allocate);
router.delete('/', ctrl.remove);

module.exports = router;
