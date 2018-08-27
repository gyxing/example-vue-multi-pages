var path = require('path');
var fs = require('fs');

// 页面所在目录
var dir = path.resolve(__dirname, '../src/pages');

var pages = [];
var list = fs.readdirSync(dir);
list.map(function(file) {
    var stat = fs.statSync(dir + '/' + file);
    if (stat && stat.isDirectory()) {
        pages.push(file);
    }
});

module.exports = pages;