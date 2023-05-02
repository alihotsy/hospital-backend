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
    
    const usuario = req.usuario;

    const hospital = new Hospital({...req.body, usuario:usuario.id});

    try {

        await hospital.save();
        
        res.status(201).json({
            ok:true,
            hospital
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
    }

}

const actualizarHospital = async(req, res = response) => {

    const { id } = req.params;

    try {
        const hospitalDB = await Hospital.findById(id);
    
        if(!hospitalDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un Hospital con ese ID'
            })
        }
    
        const hospitalActualizado = await Hospital.findByIdAndUpdate(
            id,{...req.body, usuario:req.uid},{new:true}
        );
    
        res.json({
            ok:true,
            hospital:hospitalActualizado
        })
        
    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
        
    }


}

const borrarHospital = async(req, res = response) => {

    const { id } = req.params;

    try {

        const hospital = await Hospital.findById(id);

        if(!hospital) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un Hospital con ese ID'
            })
        }
        
        await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg: 'Hospital eliminado con éxito'
        })
    } catch (error) {

        res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
        
    }


}

module.exports = {
    getHospitales,
    crearHospital,
    actualizarHospital,
    borrarHospital
}