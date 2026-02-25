//!Module-ok importálása
const express = require('express'); //?npm install express
const router = express.Router();
const path = require('path');
const upload = require('./multerMiddleware.js');
const database = require('../sql/database.js');

router.get('/fooldal', (request, response) => {
    response.sendFile(path.join(__dirname, '../../frontend/html/konyvek/fooldal.html'));
});

router.get('/hozzaad', (request, response) => {
    response.sendFile(path.join(__dirname, '../../frontend/html/konyvek/hozzaadas.html'));
});

router.post('/hozzaad', upload.none(), async (request, response) => {
    for (const key of Object.keys(request.body)) {
        if (!request.body[key]) {
            return response.status(400).json({
                success: false,
                result: null,
                message: 'Invalid body'
            });
        }
    }

    try {
        await database.insertbook(request.body);
    } catch (error) {
        console.log(error);
    }

    return response.status(200).json({
        success: false,
        result: null,
        message: 'Successfully sent'
    });
});

router.get('/megtekint', (request, response) => {
    response.sendFile(path.join(__dirname, '../../frontend/html/konyvek/megtekintes.html'));
});

router.get('/osszeskonyv', async (request, response) => {
    try {
        const result = await database.selectbooks();
        response.status(200).json({ success: true, result, message: 'Sikeresen lekérve' });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, result: null, message: 'Valami nem sikerült' });
    }
});

module.exports = router;
