const express = require('express');

const layoutCtrl = require('./purchaseOrder.controller');

const router = express.Router();

router.route('/create-layout').post( layoutCtrl.createDNDPo)
router.route('/get-layout').get( layoutCtrl.getDNDPo)
router.route('/delete-item').post( layoutCtrl.deleteDNDPo)

module.exports = router;

