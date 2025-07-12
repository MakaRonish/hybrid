const express = require('express');
const app = express();
const port = 8887;
app.use((req, res, next) => {
    res.write('<!doctype html><html lang="en"><head><meta charset="utf-8">' +
        '<title>GET Request</title></head><h3>GET Request</h3><div><ul>');
    next();
})
app.get('/retrieve', (req, res, next) => {
    const input = req.query; // parameters contained in the url (GET)
    res.write('<h2>Hello Class - ' + req.method + '</h2>');
    for (const key in input) {
        res.write('<li>' + key + ' - ' + input[key] + '</li>');
    }
    next();
})
app.listen(port, () => console.log(`Server running at localhost: ${port}!`))