const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoute');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');

// Load env first
dotenv.config();

// Initialize app early
const app = express();

/************ always-on server with self ping *****/
const SELF_PING_URL = 'https://bullcfdbackend.onrender.com'; // replace with your real URL
cron.schedule('*/14 * * * *', async () => {
  try {
    const res = await axios.get(SELF_PING_URL);
    console.log(`[PING] Self-pinged at ${new Date().toLocaleTimeString()}`);
  } catch (error) {
    console.error('[PING] x Self-ping failed:', error.message);
  }
});

/********** CORS **********/
const allowedOrigins = [
  'http://localhost:3000',
  'https://bullcfdweb-ebon.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

/********** Middleware **********/
app.use(bodyParser.json());

/********** Routes **********/
app.use('/api', userRoutes);

/********** Swagger Docs **********/
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/********** Serve React Frontend **********/
const frontendPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

/********** DB Sync & Server Start **********/
const PORT = process.env.PORT || 3000;

sequelize.sync()
  .then(() => {
    console.log('📦 Connected to MySQL database');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📘 Swagger docs: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });
