const {Router} = require('express');
const activoController = require('../controllers/activoController');
const router = Router();


router.get('/', 
    activoController.getActivos
);

router.get('/formulario', 
    activoController.getInformacionFormulario
);

router.get('/:activo_id', 
    activoController.getActivo
);

router.post('/', 
    activoController.crearActivo
);

router.put('/:activo_id',
    activoController.editarActivo  
);

module.exports = router;