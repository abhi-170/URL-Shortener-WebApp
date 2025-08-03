const { saveUrlToDB, getURLByID, incrementCount } = require("../Repository/urlRepository");
const { generateShortURL } = require("../Utils/shortUrlGenerator");
const { validateURL, isValid, isReachable } = require("../Utils/urlValidator");

const urlShortener = async (req, res) => {
    const { url } = req.body;
    validateURL(url);
    isValid(url);
    await isReachable(url);
    try {
        const shortURL = await generateShortURL();
        const originalURL = url;
        saveUrlToDB(shortURL, originalURL);
        return res.status(200).json({
            "shortURL": `http://${req.get('host')}/api/${shortURL}`,
        })
    } catch (err) {
        return res.status(500).json({
            "message": err.message,
        })
    }
};

const urlRedirection = async (req, res) => {
    const shortID = req.params.shortID;
    const urlDoc = await getURLByID(shortID);
    if (!urlDoc) {
        throw new Error("Expired or Invalid URL");
    }
    await incrementCount(urlDoc);
    const originalURL = urlDoc.originalURL;
    res.status(302).redirect(originalURL);
};

module.exports = { urlShortener, urlRedirection };