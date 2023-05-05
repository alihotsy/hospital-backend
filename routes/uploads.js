
const expressFileUpload = require('express-fileupload');
const { Router } = require('express');
const {validarJWT} = require('../middlewares/validar-jwt');
const { fileUpload, retornaImagen } = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());


router.put('/:coleccion/:id',
 validarJWT,
 fileUpload)

 router.get('/:coleccion/:foto', retornaImagen)


module.exports = router;