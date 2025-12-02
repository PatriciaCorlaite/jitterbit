require('dotenv').config();
require('express-async-errors');

const express = require('express');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(express.json());

connectDB(process.env.MONGODB_URI || 'mongodb://localhost:27017/orderdb');

app.use('/', orderRoutes);

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ success: false, error: 'Erro interno do servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));