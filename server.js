var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
var MarkdownIt = require('markdown-it');
var hljs = require('highlight.js');

var urlencodedParser = bodyParser.urlencoded({extended: false});
var md = new MarkdownIt({
  html: true,
  linkify: false,
  //typographer: false,
  //quotes: "",
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {}
    }

    return ''; // use external default escaping
  }
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
app.get('/test2.html', function (req, res) {
    res.sendFile(__dirname + req.url, function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    }); 
    
})

app.get('/favicon.ico', function (req, res) {
    res.sendFile(__dirname + req.url, function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    }); 
    
})
app.get('/logo/logo-transparent*.png', function (req, res) {
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

app.get('/node_modules/markdown-it/dist/markdown-it.js', function (req, res) {
    res.sendFile(__dirname + req.url, function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    })
})
app.get('/node_modules/highlight.js/lib/highlight.js', function (req, res) {
    res.sendFile(__dirname + req.url, function (err) {
        if (err) {
            console.log(err);
        }
        res.end();
    })
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
    //console.log(result);
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
        res.write(html_head + result + html_tail, function (err) {
            if (err) {
                console.log(err);
            }
            res.end();
        });

    }
})

var server = app.listen(8000, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Markdown Editor is openned at: http://%s:%s", host, port);
})

var html_head = ' \
<!doctype html><html> \
  <head> \
    <meta charset="utf-8"> \
    <meta name="viewport" content="width=device-width, initial-scale=1, minimal-ui"> \
    <title>Introduction</title> \
    <link type="text/css" rel="stylesheet" href="public/css/github-markdown.css"> \
    <link type="text/css" rel="stylesheet" href="public/css/pilcrow.css"> \
    <link type="text/css" rel="stylesheet" href="public/css/hljs-github.min.css"/> \
  </head> \
  <body> \
    <article class="markdown-body">'

var html_tail = '\
</article> \
  </body> \
</html>'

