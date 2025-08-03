const { URL } = require('../Models/urlModel')
const saveUrlToDB = async (shortURL, originalURL) => {
    const createdAt=new Date();
    const expiredAt=new Date(createdAt.getTime()+2*24*60*60*1000);
    const newURL = new URL({
        shortURL: shortURL,
        originalURL: originalURL,
        createdAt:createdAt.toISOString(),
        expiredAt:expiredAt.toISOString(),
    });
    return await newURL.save();
};

const getURLByID = async (shortID) => {
    try {
        const urlDoc = await URL.findOne({ shortURL: shortID });
        return urlDoc;
    }catch(err){
        throw new Error(err);
    }
};

const incrementCount= async(urlDoc)=>{
    urlDoc.clickCount++;
    return await urlDoc.save();
}

module.exports = { saveUrlToDB,getURLByID,incrementCount };