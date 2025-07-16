/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 example: john@example.com
 *               mobile:
 *                 type: string
 *                 example: +91-1234569870
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation Error
 *       409:
 *         description: User already exists
 */

const express = require('express');
const router = express.Router();
const { register } = require('../controllers/userController');

router.post('/register', register);

module.exports = router;
