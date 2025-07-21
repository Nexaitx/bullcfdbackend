const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
const authRoutes = require('./routes/userRoutes');
const { swaggerUi, swaggerSpec } = require('./config/swagger');
const pingRoute = require('./routes/pingRoute');

dotenv.config();
const app = express();

app.use(bodyParser.json());

// Swagger UI Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api', authRoutes);
app.use('/api', pingRoute);

// Sync DB and Start Server
sequelize.sync().then(() => {
  console.log('📦 Tables synced');
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📘 Swagger docs at http://localhost:${PORT}/api-docs`);
  });
});
