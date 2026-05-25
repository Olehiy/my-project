const http = require('http');
const fs = require('fs');
const url = require('url');

const PORT = process.env.PORT || 10000;

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);

    // Главная страница
    if (parsedUrl.pathname === '/') {
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, {
                    'Content-Type': 'text/plain'
                });

                res.end('Error loading index.html');
                return;
            }

            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            res.end(data);
        });
    }

    // API суммы
    else if (parsedUrl.pathname === '/sum') {
        const a = Number(parsedUrl.query.a);
        const b = Number(parsedUrl.query.b);

        if (isNaN(a) || isNaN(b)) {
            res.writeHead(400, {
                'Content-Type': 'application/json'
            });

            res.end(JSON.stringify({
                error: 'Invalid numbers'
            }));

            return;
        }

        const sum = a + b;

        res.writeHead(200, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            a,
            b,
            sum
        }));
    }

    // 404
    else {
        res.writeHead(404, {
            'Content-Type': 'application/json'
        });

        res.end(JSON.stringify({
            error: 'Route not found'
        }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
