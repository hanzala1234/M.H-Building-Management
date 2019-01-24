exports = module.exports = function (app, mongoose) {
    require('./login')(app,mongoose);
    require('./signup')(app,mongoose);
    require('./getMultiple')(app,mongoose);
    require('./profile')(app,mongoose);
    require('./payment')(app,mongoose);
}