const { Router } = require('express');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const {validarJWT} = require('../middlewares/validar-jwt');
const { getMedicos, crearMedico, actualizarMedico, borrarMedico, getMedicoById } = require('../controllers/medicos');

const router = Router();

router.get('/',[
    validarJWT
], getMedicos);

router.get('/:id', [
  validarJWT,
  check('id', 'Debe ser un ID válido').isMongoId(),
  validarCampos  
], getMedicoById)

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre del médico es obligatorio').not().isEmpty(),
    check('hospital', 'Debe ser un ID válido').isMongoId(),
    validarCampos
    
], crearMedico );

router.put('/:id',[
   validarJWT,
   check("id", 'El ID debe ser válido').isMongoId(),
   check('nombre', 'El nombre es obligatorio').not().isEmpty(),
   check('hospital', 'El ID del hospital es inválido').isMongoId(),
   validarCampos
], actualizarMedico );

router.delete('/:id',[
    validarJWT,
    check("id", 'El ID debe ser válido').isMongoId(),
    validarCampos
], borrarMedico );


module.exports = router;