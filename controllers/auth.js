const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt  = require("bcryptjs");
const generarJWT = require("../helpers/jwt");
const googleVerify = require("../helpers/google-verify");

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

const googleSignIn = async(req, res) => {


    try {
        const { email, name, picture } = await googleVerify(req.body.token);

        const usuarioDB = await Usuario.findOne({email});
        let usuario;

        if(!usuarioDB) {
          usuario = new Usuario({
            email,
            nombre:name,
            img:picture,
            password:'@@@',
            google:true
          })
        }else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        const token = await generarJWT(usuario.id);

        await usuario.save();

    
        res.json({
            ok:true,
            email,
            name,
            picture,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok:false,
            msg: 'Token de Google no es correcto'
        })
    }


}

const renewToken = async(req,res = response) => {

    const usuario = req.usuario;

    const token = await generarJWT(usuario.id);

    res.json({
        ok:true,
        usuario,
        token
    })

}



module.exports = {
    login,
    googleSignIn,
    renewToken
};