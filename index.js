const app = require('express')();
const express = require('express');

const port = 3000;
const urlRouter = require('./routers/url_router.js');
const URL = require('./model/url.js');

const {connectToDB} = require('./connect');

connectToDB('mongodb://localhost:27017/url-shortener').then(() => { console.log('Connected to MongoDB') });

app.use(express.json());
app.use('/url', urlRouter);
// Log each request to the server
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});


app.get("/:shortid", async (req, res) => {
  try {
    const shortid = req.params.shortid;
    console.log("shortid ", shortid);
    const entity = await URL.findOneAndUpdate(
      { shortId: shortid },
      { $push: { vistHistory: { timeStamp: Date.now() } } },
      { new: true }
    );

    if (!entity) {
      console.error(`No URL found for shortId: ${shortid}`);
      return res.status(404).send("URL not found");
    }

    let redirectURL = entity.redirectURL;

    // Ensure the URL is valid
    if (!/^https?:\/\//i.test(redirectURL)) {
      redirectURL = 'http://' + redirectURL;
    }

    console.log("Redirecting to: ", redirectURL);
    res.redirect(redirectURL);
  } catch (error) {
    console.error("Error while fetching the entity: ", error);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
