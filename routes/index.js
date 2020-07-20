module.exports = function (app) {

    let url = require('./url');

    app.use('/', url);

}