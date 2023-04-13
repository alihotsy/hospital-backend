const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt  = require("bcryptjs");
const generarJWT = require("../helpers/jwt");

const login = async(req, res = response) => { 

    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB) {
           return res.status(404).json({
            ok:false,
            msg: 'El correo no existe'
           })
        }

        if(!bcrypt.compareSync(password, usuarioDB.password)) {
            return res.status(404).json({
                ok:false,
                msg: 'El password es inválido'
               })

        }

        const token = await generarJWT(usuarioDB._id);

        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
        
    }

}

module.exports = login;