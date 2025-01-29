const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'dist/browser')));
app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname, 'dist/browser/index.html'));
});
app.listen(process.env.PORT || 8080);