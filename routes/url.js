const express = require('express');
const shortid = require('shortid');
const mongoose = require('mongoose');
const validUrl = require('valid-url');

const router = express.Router();

const Url = require('../models/Url');
mongoose.connect('mongodb://localhost/url-shortener')

router.post('/', async function(req, res){

    try {

        // console.log(req.body)
        const { longUrl } = req.body;

        if(!validUrl.isUri(longUrl)){
            return res.status(401).json('Invalid url!');
        }

        else {

        const urlCode = shortid.generate();

        let url = await Url.findOne( { longUrl: longUrl });

        if (url) {
            res.json(url.shortUrl);
        } else {

            const shortUrl = "http://localhost:3000/" + urlCode;

            url = new Url({
                longUrl,
                shortUrl,
                urlCode,
                date: new Date()
            });

            await url.save();
            res.json({ shortUrl });

        }
    }
        
    } catch (err) {
        
        console.log(err);
        res.status(400).json('Server error');

    }
});

module.exports = router;

