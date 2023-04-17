const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario','nombre img');

    res.json({
        ok:true,
        hospitales
    })

}

const crearHospital = async(req, res = response) => {
    

    const hospital = new Hospital({...req.body, usuario:req.uid});

    try {

        await hospital.save();
        
        res.status(201).json({
            ok:true,
            hospital
        })
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
    }

}

const actualizarHospital = (req, res = response) => {

    res.json({
        ok:true,
        msg: 'PUT - Hospitales'
    })

}

const borrarHospital = (req, res = response) => {

    res.json({
        ok:true,
        msg: 'DELETE - Hospitales'
    })

}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}