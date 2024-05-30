const express = require('express');
const {generateShorID,getAnalytics} = require('../controller/url_controller');

const router = express.Router();
router.post("/" ,  generateShorID);
router.get("/analytic/:shortid" , getAnalytics);

module.exports = router;

