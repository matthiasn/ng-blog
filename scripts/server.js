/**
 *  Server for ng-blog in authoring mode
 *
 *  Will serve files and additionally provide a server sent event (SSE) stream.
 *  In this stream: one event for each file change within the blog folder
 *
 *  My thanks go to:
 *  https://npmjs.org/package/sse
 *  https://github.com/paulmillr/chokidar
 *  https://gist.github.com/rpflorence/701407
 **/

var chok = require('chokidar');
var SSE  = require('sse');
var http = require('http');
var url  = require("url");
var path = require("path");
var fs   = require("fs");
var port = process.argv[2] || 8888;

/** adapted from https://github.com/paulmillr/chokidar */
var watcher = chok.watch('blog', { ignored: /^\./, persistent: true });

var fileServer = http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);

    path.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.html';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
});

fileServer.listen(8888, '127.0.0.1', function () {
    var sse = new SSE(fileServer);
    sse.on('connection', function (client) {
        watcher.on('change', function (path) {
            console.log(path);
            client.send(path);
        });
    });
});
