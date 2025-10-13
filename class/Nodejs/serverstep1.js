// server-step1.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true })); // for application/x-www-form-urlencoded

// Route 1: Show HTML form
app.get('/', (req, res) => {
  res.send(`
    <h2>User Form</h2>
    <form action="/submit" method="post">
      <label>Username:</label>
      <input type="text" name="username" required /><br/><br/>
      
      <label>Email:</label>
      <input type="email" name="email" required /><br/><br/>
      
      <label>Message:</label><br/>
      <textarea name="message"></textarea><br/><br/>
      
      <button type="submit">Submit</button>
    </form>
  `);
});

// Route 2: Handle form submission
app.post('/submit', (req, res) => {
  const { username, email, message } = req.body;
  res.send(`
    <h2>Form Submitted Successfully!</h2>
    <p><strong>Username:</strong> ${username}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
    <a href="/">Go back</a>
  `);
});

app.listen(PORT, () => console.log(`Step 1 running on http://localhost:${PORT}`));
