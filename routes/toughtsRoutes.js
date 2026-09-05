const express = require('express');
const router = express.Router();
const ToughtController = require('../controllers/ToughtController');

console.log('Pensamentos: ',ToughtController.showToughts);
router.get('/', ToughtController.showToughts);

module.exports = router;