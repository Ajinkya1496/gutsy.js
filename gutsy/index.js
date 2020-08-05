const http = require('http');

class Gutsy {
    constructor() {
        this._stack = new Map();
    }

    get(path, handler) {
      this._stack.set(path, handler);
    }

    listen(port, callback) {
        const handler = (req, res) => {
            this.handle(req, res, err => {
              if (err) {
                res.writeHead(500);
                res.end('Internal Server Error ');
              }
            });
          };
          return http.createServer(handler).listen({ port }, callback);
    }

    handle(req, res, callback) {
        let idx = 0;

        const next = (err) => {
          if (err != null) {
            return setImmediate(() => callback(err));
          }
          if (idx >= this._stack.length) {
            return setImmediate(() => callback());
          }
          
          const layer = this._stack.get(req.url);
          setImmediate(() => {
            try {
              layer(req, res, next);
            } catch(error) {
              next(error);
            }
          });
        };
      
        next();
    }
}

module.exports = Gutsy;