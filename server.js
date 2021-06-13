const express = require('express');
const myApp = express();

myApp.use(express.static('./dist/personal'));

myApp.get('/*', function(req, res) {
    res.sendFile('index.html', {root: 'dist/personal/'});
});

myApp.listen(process.env.PORT || 8080);