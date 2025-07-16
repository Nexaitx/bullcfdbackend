const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const path = require('path');
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoute');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const cors = require('cors');

/*******origin allow */

const allowedOrigins = [
  'http://localhost:3000',
  'https://bullcfdweb-ebon.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Allow request
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, 
}));



dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());

// API Routes
app.use('/api', userRoutes);

// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Serve React Frontend
const frontendPath = path.join(__dirname, 'frontend', 'build');
app.use(express.static(frontendPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Start server after DB sync
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
    console.error('❌ Error connecting to MySQL:', err);
  });
