import * as net from 'net';

const server = net.createServer((socket) => {
    socket.on('data', (data) => {
        const [head, ...body] = String(data).split(/\r?\n\r?\n/);
        const [httpHeader, ...headers] = head.split(/\r?\n/);
        const [method, path, version] = httpHeader.split(/\s/);

        if (method.toUpperCase() !== 'GET'){
            return;
        }

        if (version.toUpperCase() != "HTTP/1.1"){
            return;
        }
        console.log(`[${path}]`);
        socket.write(`HTTP/1.1 200 OK
Server: Apache
Content-Type: text/plain

OK
`);
        socket.end();   
      });
}).on('error', (err) => {
    // Handle errors here.
    throw err;
});
  
// Grab an arbitrary unused port.
server.listen(3500);
console.log('http://localhost:3500')