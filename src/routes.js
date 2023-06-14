const { Router } = require('express');
const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.get('/users', ContactController.index);
router.get('/users/:id', ContactController.show);
router.delete('/users/:id', ContactController.delete);
router.post('/users', ContactController.store);
router.put('/users/:id', ContactController.update);

module.exports = router;
