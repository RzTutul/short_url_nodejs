const express = require('express');
const {generateShorID,getAnalytics} = require('../controller/url_controller');

const router = express.Router();
router.post("/" ,  generateShorID);
router.get("/analytic/:shortid" , getAnalytics);


router.get("/", async(req, res) => {
    const allUrls = await URL.find();
    res.render("home", { urls: allUrls });
    });
  
  

module.exports = router;

