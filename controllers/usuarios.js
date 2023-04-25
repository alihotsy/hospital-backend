const { response, request } = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');
const generarJWT = require('../helpers/jwt');

const getUsuarios = async(req = request,res) => {

    const { desde = 0 } = req.query;

    const [usuarios, total] = await Promise.all([
        Usuario.find().skip(Number(desde)).limit(5),
        Usuario.countDocuments()
    ]);


    res.json({
        ok:true,
        usuarios,
        uid: req.uid,
        total
    })

}

const crearUsuario = async(req, res = response) => {

    const { nombre, password, email } = req.body;


    try {
        const existsEmail = await Usuario.findOne({email});
    
        if(existsEmail) {
            return res.status(400).json({
                ok:false,
                msg: 'El correo ya existe!'
            })
        }
    
        const usuario = new Usuario({nombre, password, email});

        //Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        usuario.password = bcryptjs.hashSync(password,salt);
    
        await usuario.save();

        const token = await generarJWT(usuario.id);
     
        res.status(201).json({
            ok:true,
            usuario,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error insesperado - Revisar los Logs'
        })
    }

}

const actualizarUsuario = async(req = request, res) => {

    //TODO: Validar el token y comprobar si es el usuario correcto

    const { id } = req.params;
    const { google, password, ...resto } = req.body

    try {

        const [usuarioDB, existsUserByEmail] = await Promise.all([
             Usuario.findById(id),
             Usuario.findOne({email: resto.email})
        ]);

        if(!usuarioDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un usuario por ese ID'
            })
        }

        //Actualizar

        if(existsUserByEmail && id !== existsUserByEmail?._id.toString() ) {
            return res.status(400).json({
                ok:false,
                msg: 'El email ya existe!'
            })
        }

        if(usuarioDB.google) {
            delete resto.email;
        }

        // if(usuarioDB.google && !existsUserByEmail) {
        //     return res.status(400).json({
        //         ok:false,
        //         msg: 'Usuarios de Google no pueden cambiar su email'
        //     })
        // }
        
        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, resto, {new:true});


        res.json({
            ok:true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error insesperado'
        })
    }
}

const eliminarUsuario = async(req,res) => {

    const { id } = req.params;

    const usuarioDB = await Usuario.findById(id);

    if(!usuarioDB) {
        return res.status(404).json({
            ok:false,
            msg: 'El usuario no existe por ese ID'
        })
    }

    await Usuario.findByIdAndDelete(id);

    res.json({
        ok:true,
        msg: 'Usuario eliminado satisfactoriamente'
    })

}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}