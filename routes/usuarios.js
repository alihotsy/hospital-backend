const { Router } = require('express');
const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { check } = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const { validarJWT, validarRole } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/',[
    validarJWT
], getUsuarios);

router.post('/', [
    check('nombre','El nombre es obligatorio').trim().not().isEmpty(),
    check('password', 'El password es obligatorio').trim().not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    validarCampos
], crearUsuario);

router.put('/:id',[
    validarJWT,
    validarRole,
    check('id', 'ID inválido').isMongoId(),
    check('nombre','El nombre es obligatorio').trim().not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('role', 'El role es obligatorio').trim().not().isEmpty(),
    validarCampos
], actualizarUsuario);

router.delete('/:id',[
    validarJWT,
    validarRole,
    check('id', 'ID inválido').isMongoId(),
    validarCampos
], eliminarUsuario);


module.exports = router;