const axios = require('axios');

const validateURL = (url) => {
    if (url == null || url == "") {
        throw new Error(`The URL must not be empty`);
    }
};

const isValid = (url) => {
    try {
        new URL(url);
        return true;
    } catch (error) {
        throw new Error(`The URL must contain a valid address`);
    }
};

const isReachable = async (url) => {
    try {
        const header = await axios.head(url, { timeout: 3000 });
        return header.status >= 200 && header.status < 400;
    } catch (error) {
        throw new Error(`The URL must be reachable`);
    }
}



module.exports = { validateURL, isReachable, isValid };