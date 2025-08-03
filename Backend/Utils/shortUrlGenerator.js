const generateShortURL = async() => {
const { nanoid } = await import('nanoid');
    return nanoid(7); 
};
module.exports={generateShortURL};