const { request } = require("express")
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async(req = request,res, next) => {

    const token = req.header('x-token');
    
    if(!token) {
        return res.status(401).json({
            ok:false,
            msg: 'Se debe enviar un token en la petción'
        })
    }

    try {
        const { uid } = jwt.verify(token,process.env.JWT_SECRET);
        
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'Este usuario no existe en la BD'
            })

        }

        req.usuario = usuarioDB;
        next();
    } catch (error) {

        res.status(401).json({
            ok:false,
            msg: 'Token inválido o caducó'
        })
        
    }

}

const validarRole = (req,res,next) => {

    const { id } = req.params;
    const { role } = req.usuario;

   
    if(role !== 'ADMIN_ROLE' && id !== req.usuario.id.toString()) {
       return res.status(401).json({
        ok:false,
        msg:'No tiene privilegios para realizar esta acción - DENEGADO!'
       })
    }

    next();

}

module.exports = {
    validarJWT,
    validarRole
};