const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve HTML, JS from the src directory
app.use('/src', express.static(path.join(__dirname, 'src')));
// Serve CSS from the css directory
app.use('/css', express.static(path.join(__dirname, 'css')));
// Serve images from the images directory
app.use('/images', express.static(path.join(__dirname, 'images')));

// Redirect base URL to main HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'rockpaperscissors.html'));
});

app.listen(port, () => {
    console.log(`Rock Paper Scissors game running at http://localhost:${port}`);
});
