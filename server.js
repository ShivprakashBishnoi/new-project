const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files

// Route for handling the signup form
app.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Store user data in a file
    const userData = `Username: ${username}, Email: ${email}, Password: ${password}\n`;

    fs.appendFile('users.txt', userData, (err) => {
        if (err) {
            console.error('Failed to save user data:', err);
            return res.status(500).send('Server error');
        }
        res.send('Signup successful!');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:3000${PORT}`);
});
