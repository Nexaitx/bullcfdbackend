const express = require('express');
const router = express.Router();
const { ping } = require('../controllers/pingController');

/**
 * @swagger
 * /api/ping:
 *   get:
 *     summary: Ping route to keep the server alive
 *     description: Responds with 'pong' to indicate server is alive.
 *     responses:
 *       200:
 *         description: Server is alive
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: pong
 */
router.get('/ping', ping);

module.exports = router;
