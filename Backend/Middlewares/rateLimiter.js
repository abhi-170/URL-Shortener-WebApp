const rateLimiter=require('express-rate-limit');

const limiter=rateLimiter({
    windowMs: 5*60*1000,
    max:20,
    message:"To many requests, please try later.",
    standardHeaders:true,
    legacyHeaders:false,
});

module.exports={limiter};