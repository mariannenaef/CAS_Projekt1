import express from 'express';
import path from 'path';
import {noteRoutes} from './routes/noteRoutes.js';

const app = express();
const allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

// app.use(bodyParser.json());
app.use(express.json());

app.use(express.static(path.resolve('public/html')));
app.use(express.static(path.resolve('public')));
app.use(allowCrossDomain);

app.use("/notes", noteRoutes);

app.use(function (err, req, res, next) {
    next(console.log(err));
});

const hostname = '127.0.0.1';
const port = 3002;
app.listen(port, hostname, () =>{
    console.log('Server running at http://' + hostname + ':' + port + '/');
});