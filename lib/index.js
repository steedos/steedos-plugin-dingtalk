"use strict";
exports.__esModule = true;
var router = require('../src/dingtalk/server_callback');
exports.init = function (_a) {
    var app = _a.app;
    app.use('', router.router);
};