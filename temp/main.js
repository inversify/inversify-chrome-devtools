"use strict";
var inversify_devtools_1 = require("inversify-devtools");
document.addEventListener("DOMContentLoaded", function () {
    var connectKernel = inversify_devtools_1.default("root");
    var win = window;
    win.__inversifyDevtools__ = connectKernel;
});
