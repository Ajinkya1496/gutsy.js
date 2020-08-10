const { createServer, IncomingMessage, ServerResponse } = require('http');
const fs = require('fs');
const path = require('path')
const { URL } = require('url');
const { parse } = require('querystring');

class Gutsy {
    constructor() {
        this.routeMap = new Map();
    }

    get(path, handler) {
      this.routeMap.set(path, handler);
    }

    post(path, handler) {
      this.routeMap.set(path, handler);
    }

    put(path, handler) {
      this.routeMap.set(path, handler);
    }

    delete(path, handler) {
      this.routeMap.set(path, handler);
    }

    listen(port, callback) {
      createServer(
        {IncomingMessage: Request, ServerResponse: Response},
        this.handle).listen(port, callback);
    }

    handle = (req, res) => {
      if(!this.routeMap.has(req.url)) throw `Not found- ${req.method}: ${req.url}`
      const executor = this.routeMap.get(req.url);
      if(typeof executor === "function") {
        return executor(req, res);
      }
      return executor;
    }
}

class Request extends IncomingMessage {
  getBody() {
    let body = '';
    if(this.method === 'POST' && this.headers["content-type"]==='application/x-www-form-urlencoded') {
      return new Promise((resolve, reject) => {
        this.on('data', chunk => {
          body += chunk.toString();
        })
        this.on('end', () => {
          resolve(parse(body));
        });
      })
    }
    else {
      throw `Only content-type 'application/x-www-form-urlencoded' supported`;
    }
  }
}

class Response extends ServerResponse {
  toJSON() {
    this.writeHead(200, {'Content-Type': 'application/json'});
  }

  toHTML() {
    this.writeHead(200, {'Content-Type': 'text/html'})
  }

  render(filename) {
    let markupContent;
    let filepath = path.join(filename);
    this.toHTML();
    fs.readFile(filepath, (err,content) => {
      if(content) {
        markupContent = content;
        this.write(markupContent)
        this.end();
      } else {
        this.end(`<h3>Could not read ${filename}: ${err}</h3>`);
      }
    });
  }

  html(markup) {
    this.toHTML();
    this.end(markup);
  }

  json(data) {
    this.toJSON();
    this.write(JSON.stringify(data));
    this.end();
  }
}

module.exports = Gutsy;