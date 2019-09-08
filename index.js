const express = require('express');
const path = require('path');
const app = express();
const exphbs = require('express-handlebars');
const members = require('./members');

//const logger = require('./middleware/logger')
// Initializing Middlewares
// app.use(logger);

// Handlebar Middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rendering
app.get('/', (req, res) => {
    res.render('index', {
        title: "My App!",
        members
    })
})

// Setting static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routers
app.use('/api/members', require('./routes/api/members'));

// For deployment purposes
const PORT = process.env.PORT || 5000;

// Initializing the app with the port number!
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});