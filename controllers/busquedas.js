const { request } = require("express");
const Usuario = require('../models/usuario');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const getTodo = async(req = request, res) => {

    const { busqueda } = req.params;
    const regexp = new RegExp(busqueda, 'i');

    const [usuarios, medicos, hospitales] = await Promise.all([
        Usuario.find({nombre: regexp}),
        Medico.find({nombre: regexp}),
        Hospital.find({nombre: regexp})
    ])


    res.json({
        ok:true,
        usuarios,
        medicos,
        hospitales
    })

}

const getDocumentosColeccion = async(req = request, res) => {

    const { tabla,busqueda } = req.params;
    const regexp = new RegExp(busqueda, 'i');
    let data;

    switch (tabla) {
        case 'medicos':
         data = await Medico.find({nombre:regexp})
                            .populate('usuario', 'nombre img')
                            .populate('hospital','nombre img')
         break;
        
        case 'hospitales':
         data = await Hospital.find({nombre:regexp})
                            .populate('usuario', 'nombre img')
         break;

        case 'usuarios':
         data = await Usuario.find({nombre:regexp});   
         break;
    
        default:
           return res.status(400).json({
                ok:false,
                msg: 'La tabla debe ser médicos/hospitales/usuarios'
            })
    }

    return res.json({ok:true,resultado:data})

}

module.exports = {
    getTodo,
    getDocumentosColeccion
};