const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
module.exports = function dbConfig() {
    mongoose.connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    }).then(res => {
        console.log("------Hi Ready to serve you-------");
    }, err => {
        console.log(err)
        console.log("------Oops DB connection error------");
    })
}
