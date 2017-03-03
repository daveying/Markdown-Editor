var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var MarkdownIt = require('markdown-it');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var md = new MarkdownIt({
  html: false,
  linkify: true,
  typographer: false,
  quotes: ""
});

app.use(express.static('public'));

app.get('/index.html', function (req, res) {
    res.sendFile(__dirname + req.url, function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    }); 
    
})

app.get('/public/*', function (req, res) {
    res.sendFile(__dirname + req.url, function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    }); 
    
})

app.get('/', function (req, res) {
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write('<a href="index.html">Click here to editor page</a>');   
    res.sendFile(__dirname + "/index.html", function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    }); 
})

app.post('/parseMdStr', urlencodedParser, function (req, res) {
    var result = md.render(req.body.fakeMd);
    console.log(result);
    if (req.body.saveOrPreview === "save") {
        var filename = "public/temp_md/" + req.body.randomName + ".md";
        console.log(filename);
        fs.writeFile(filename, req.body.fakeMd, function (err) {
            res.download(filename, function (err) {
                if (err) {
                    console.log(err);
                }
                res.end();
            });
        });
    }
    else {
        res.write(result, function (err) {
            if (err) {
                console.log(err);
            }
            res.end();
        });

    }
})

var server = app.listen(7888, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Markdown Editor is openned at: http://%s:%s", host, port);
})

