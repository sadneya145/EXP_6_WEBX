const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Static array of existing usernames
let usernames = ['john123', 'alice', 'bob456', 'neha', 'rahul007', 'dave', 'rita', 'ankit', 'sneha', 'mohit'];

// API to get usernames (for async check)
app.get('/usernames', (req, res) => {
  res.json(usernames);
});

// Handle registration
app.post('/register', (req, res) => {
  const { name, college, username, password, confirmPassword } = req.body;

  if (!name || !college || !username || !password || !confirmPassword) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  if (usernames.includes(username)) {
    return res.status(400).json({ success: false, message: 'Username already exists' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ success: false, message: 'Passwords do not match' });
  }

  // Add username to static array
  usernames.push(username);

  console.log(`New user registered: ${username}`);
  res.status(200).json({ success: true });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
