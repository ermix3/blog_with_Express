const express = require('express');
const mongoose = require('mongoose');
const postRoutes = require('./routes/postRoutes');
const methodOverride = require('method-override');

// Create a new express application instance
const app = express();

// Cinnect to the database
const dbURI = 'mongodb+srv://ermix:ermix@blog-with-node.yc6y82v.mongodb.net/blog-with-node?retryWrites=true&w=majority'

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(3000, () => console.log('listening on port 3000 ... http://localhost:3000')))
    .catch(err => console.log(err));

// Configure view engine to render EJS templates
app.set('view engine', 'ejs');

// Middleware && static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});
app.use(methodOverride('_method'));

// routes
app.get('/', (req, res) => res.redirect('/posts'));
app.get('/about', (req, res) => res.render('about', {title: "About"}));

// Blog routes
app.use('/posts',postRoutes);

// 404 page
app.use((req, res) => res.status(404).render('404', {title: "404"}));
