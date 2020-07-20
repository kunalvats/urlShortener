const express = require('express');
const app = express()
const PORT = 3000;

app.use(express.json());

app.use('/', require('./routes/url'));

app.listen(PORT, function(){
    console.log("Server running on http://localhost:3000/");
});