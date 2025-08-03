const express=require('express');
const { urlShortener, urlRedirection } = require('../Services/urlService');
const router=express.Router();

router.post('/shorten',urlShortener);
router.get('/:shortID',urlRedirection);

module.exports={router};