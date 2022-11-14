const express = require('express');
const bodyparser = require('body-parser');
const authRoutes = require('./routes/auth');
const errorController = require('./controllers/error')
const app = express()
const ports = process.env.PORT || 3000;

app.use(bodyparser.json());
app.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Origin', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    next();
});

app.use('/auth', authRoutes);
app.use(errorController.get404);
app.use(errorController.get500);

app.listen(ports, () => console.log(`Listening on port ${ports}`))