var allowedExt = [
    '.js',
    '.ico',
    '.css',
    '.png',
    '.jpg',
    '.woff2',
    '.woff',
    '.ttf',
    '.svg',
    '.json'
];

const path = require('path');
const express = require('express');
const app = express();

function requireHTTP(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (req.secure || req.get('x-forwarded-proto') === 'https') {
        return res.redirect('http://' + req.get('host') + req.url);
    }
    next();
}

app.use(express.static('./dist/personal'));
app.use(requireHTTP);

// app.get('/*', function(req, res) {
//     res.sendFile('index.html', {root: 'dist/personal/'});
// });

app.get('*', (req, res) => {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`${req.url}`));
    } else {
        res.sendFile(path.resolve('dist/index.html'));
    }
});


app.listen(process.env.PORT || 8080);
