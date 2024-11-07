const {Router} = require('express');
const activoColumnaController = require('../controllers/activoColumnaController');
const router = Router();

router.get('/', activoColumnaController.getColumnas);

router.post('/', activoColumnaController.crearColumna);

module.exports = router;