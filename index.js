const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
const db = require('./db/db')();

const indexRouter = require('./routes/index');

const index = express();

index.use(logger('dev'));
index.use(cors());
index.use(expressValidator());
index.use(express.json());
index.use(express.urlencoded({ extended: false }));
index.use(cookieParser());
index.use(express.static('public'));

index.use('/', indexRouter);
index.listen(process.env.PORT || 3000, ()=>{
    console.log("Server started")
});
console.log(process.env.APP_SECRET)
module.exports = index;
