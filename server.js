const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

const subjects = ['English', 'Hindi', 'Physics', 'Chemistry', 'Mathematics', 'Biology'];

app.get('/', (req, res) => {
  res.json({ message: 'Bihar Board Class 12 Mock Test Platform API is running.' });
});

app.get('/api/subjects', (req, res) => {
  res.json(subjects.map((name, index) => ({ id: index + 1, name, questions: 100 })));
});

app.get('/api/analytics', (req, res) => {
  res.json({
    totalStudents: 1280,
    totalTests: 5420,
    averageScore: 72,
    completionRate: 86
  });
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    res.json({ success: true, token: 'demo-jwt-token', studentName: 'Demo Student' });
    return;
  }
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.post('/api/results', (req, res) => {
  res.json({ success: true, message: 'Result stored', result: req.body });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
