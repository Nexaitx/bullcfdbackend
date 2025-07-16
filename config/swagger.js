const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger Configuration
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tradex Backend API',
      version: '1.0.0',
      description: 'API documentation for Tradex Register/Login system',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local server',
      },
      {
        url: 'https://bullcfdbackend.onrender.com',
        description: 'Production server (Render)',
      },
    ],
  },
  apis: ['./routes/*.js'], // Your route files for Swagger annotations
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec
};
