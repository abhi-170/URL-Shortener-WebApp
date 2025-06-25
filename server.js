const express = require('express');
const dotenv = require('dotenv');
const { connectDB } = require('./Config/configDB');
const { router } = require('./Routes/urlRoutes');
const { sanitizeInput } = require('./Middlewares/sanitizeInput');
const { limiter } = require('./Middlewares/rateLimiter');
const { errorHandler } = require('./Middlewares/errorHandler');
const app = express();
dotenv.config();

app.use(express.json());
app.use(sanitizeInput);
app.use(limiter);

app.get('/', (req, res) => {
    res.send("basic server");
})
app.use('/api',router);
app.use(errorHandler);

const PORT=process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`server is listening at ${PORT}`);
    connectDB();
})
