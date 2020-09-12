const express = require('express');
const app = express();
const connectDb = require('./config/db');

connectDb();

app.use(express.json({ extended: false }));

app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'))

const PORT = process.env.PORT || 8080

app.listen(PORT, () => { console.log(`Server is Running on port ${PORT}`);})