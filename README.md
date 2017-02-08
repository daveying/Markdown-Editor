# Introduction

This is a markdown editor based on [ACE](https://ace.c9.io/) web editor 
and [markdown-it](https://github.com/markdown-it/markdown-it).

You can deploy this editor on a remote server or just install on local computer.

It's very easy to use. Just open the web page and you can edit markdown text at 
left and you can preview the results at right once you press the button `PREVIEW`.
You can save the file to local if you press the button `SAVE`(this function is 
under develeping).

# How to deploy on local computer
## Install Node.js

This editor is based on [Node.js](https://nodejs.org/en/), so you should install 
[Node.js](https://nodejs.org/en/) first. You can find Node.js package [here](https://nodejs.org/en/download/).

Download proper version according your platform and follow the install 
[instructions](https://nodejs.org/en/download/package-manager/) provided by Node.js website.

The way to verify you have already install Node.js is to run following two command:
``` bash
$ node -v
$ npm -v
```
Above commands are used to check the version of Node.js and npm you have just installed.
You should get similar output.
``` bash
$ node -v
v6.9.5
$ npm -v
4.1.2
```

## Download the source code of the editor
Download/clone the source code of the editor from [github](https://github.com/daveying/Markdown-Editor).

You can run the server with Node.js.
``` bash
$ node /path/to/source/code/server.js
```
Then, you can open a browser, and visit [http://127.0.0.1:7888/index.html](http://127.0.0.1:7888/index.html), 
you can see the editor like this.
![Markdown Editor](public/pic/markdown_editor.png "This Markdown Editor")


# How to deploy on remote server
To be continued...