const express = require('express');
const app = express();
const port = 8887;
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.listen(port, () => console.log(`Server running at
localhost: ${port}!`))

const mongoose = require('mongoose');
const DataBase = 'mongodb://0.0.0.0:27017/sheridan';
mongoose.set('strictQuery', true);
const courseSchema = new mongoose.Schema({
    cid: String,
    wday: String,
    prof: String
});
const course = mongoose.model('courses', courseSchema);
mongoose.connect(DataBase);
const db = mongoose.connection;
db.on('error', (err) => { console.log(err); })
db.once('open', () => {
    app.post('/insert', (req, res) => {
        input = req.body.params;
        course.create(input)
            .then(
                result => {
                    res.send({ "message": 'Record added' });
                },
                err => { res.send(err.message); })
            .catch(err => { console.log(err); });
    });

    app.get('/retrieve', (req, res) => {
        input = req.query;
        course.find(input) //find()
            .then(
                result => {
                    res.send(result);
                },
                err => { res.send(err.message); })
            .catch(err => { console.log(err); });
    });
});