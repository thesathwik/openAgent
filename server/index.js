const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const dns = require('dns').promises;

const app = express();
const PORT = process.env.PORT || 4000;
const DATA_DIR = path.join(__dirname, '../data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

app.use(bodyParser.json());

function loadUsers() {
  if (!fs.existsSync(USERS_FILE)) {
    return [];
  }
  const data = fs.readFileSync(USERS_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveUsers(users) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
  }
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

async function emailDomainValid(email) {
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  try {
    const records = await dns.resolveMx(domain);
    return Array.isArray(records) && records.length > 0;
  } catch (e) {
    return false;
  }
}

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!(await emailDomainValid(email))) {
    return res.status(400).json({ error: 'Email domain is not valid' });
  }
  const users = loadUsers();
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), name, email, password: hashed };
  users.push(user);
  saveUsers(users);
  res.json({ message: 'User created', user: { id: user.id, name, email } });
});

app.post('/signin', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  const users = loadUsers();
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(400).json({ error: 'Invalid email or password' });
  }
  res.json({ message: 'Signed in', user: { id: user.id, name: user.name, email } });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

