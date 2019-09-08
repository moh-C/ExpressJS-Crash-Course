const express = require('express');
const path = require('path');
const members = require('./members')

const app = express();

const logger = (req, res, next) => {
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(logger);

// A simple REST API
app.get('/api/members', (req, res) => {
    res.json(members);
});

// Setting static folder
app.use(express.static(path.join(__dirname, 'public')));

// For deployment purposes
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});