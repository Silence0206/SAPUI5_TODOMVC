var http = require('http');
var express = require('express');
var app = express();
console.log(__dirname)
app.use("/public", express.static(__dirname + '/public'));

// 创建服务端
http.createServer(app).listen('8080', function() {
    console.log('done');
});

// var express = require("express");
// var app = express();
// app.use("/", express.static(__dirname + "/public"));
// app.listen(3000);

// /*加载模块*/
// var express = require('express');
// var http = require('http');
// var path = require('path');
// /*创建服务*/
// var app = express();
// app.set('port', 8080);
// app.use(express.static(path.join(__dirname, 'public')));
// /*服务启动*/
// http.createServer(app).listen(app.get('port'), function() {
//     console.log('静态资源服务器已启动,监听端口:' + app.get('port'));
// });