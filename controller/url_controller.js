const shortid = require('shortid');
const URL = require('../model/url');

async function generateShorID(req, res) {

    const body = req.body;
    console.log("test",req.body)

    if (!body.url) {
        return res.status(400).json({
            message: 'URL is required'
        });
    }

 const shortID = shortid();
 console.log("shortID",shortID)
 await URL.create({
    shortId: shortID,
        redirectURL: body.url,
        visitHistory: []
    });

    return res.render('home',{
        shortID: shortID
    });
}

async function getAnalytics(req, res) {
    console.log("req.params",req.params)
    const shortId = req.params.shortid;
    console.log("shortId",shortId)
    const entity = await URL.findOne({
        shortId: shortId
    });

    if (!entity) {
        return res.status(404).json({
            message: 'No URL found'
        });
    }

    return res.json({
        totalClicke: entity.vistHistory.length,
        visitHistory: entity.vistHistory

    });


}

module.exports =  {generateShorID,getAnalytics};
