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
        req.uid = uid;
        
        const usuarioDB = await Usuario.findById(uid);

        if(!usuarioDB) {
            return res.status(401).json({
                ok:false,
                msg: 'Este usuario no existe en la BD'
            })

        }
        next();
    } catch (error) {

        res.status(401).json({
            ok:false,
            msg: 'Token inválido o caducó'
        })
        
    }

}

module.exports = validarJWT;