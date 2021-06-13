function requireHTTPS(req, res, next) {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}
const express = require('express');
const myApp = express();
myApp.use(requireHTTPS);

myApp.use(express.static('./dist/personal'));

myApp.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/personal/'});
});

myApp.listen(process.env.PORT || 8080);