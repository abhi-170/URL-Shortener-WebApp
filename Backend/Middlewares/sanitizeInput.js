const sanitizeInput = (req, res, next) => {
    try {
        if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
            if (!req.body || !req.body.url) {
                return res.status(400).json({ error: 'Missing URL in request body' });
            }
            if (req.body && typeof req.body.url === 'string') {
                req.body.url = req.body.url.trim();
            }
            if (req.body.url && !req.body.url.startsWith('http://') && !req.body.url.startsWith('https://')) {
                req.body.url = 'http://' + req.body.url
            }
        }
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = { sanitizeInput };