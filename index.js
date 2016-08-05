'use strict';

let fs = require('fs');
let hoxy = require('hoxy');
let proxy = hoxy.createServer({
    reverse: 'http://localhost:9000'
}).listen(1338);

proxy.intercept({
    phase: 'request',
    method: 'GET',
    hostname: 'localhost',
}, (req, res, cycle) => {
    let fileName = `./responseFiles/${encodeURIComponent(req.url)}`;

    if (fs.existsSync(`${fileName}`)) {
        console.log(`Intercepted request made to ${req.url}`);
        let responseData = fs.readFileSync(fileName, 'utf8');

        res.string = responseData;
    }
});
