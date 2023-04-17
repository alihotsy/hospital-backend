const { response } = require("express");
const Medico = require("../models/medico");

const getMedicos = async(req, res = response) => {

    const medicos = await Medico.find()
                         .populate('usuario', 'nombre img')
                         .populate('hospital', 'nombre img')
                        

    res.json({
        ok:true,
        medicos
    })
}

const crearMedico = async(req, res = response) => {

    const medico = new Medico({...req.body,usuario:req.uid})

    try {

        await medico.save();

        res.status(201).json({
            ok:true,
            medico
        })
        
    } catch (error) {
        res.status(500),json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
    }

}

const actualizarMedico = (req, res = response) => {

    res.json({
        ok:true,
        msg: 'PUT - Médicos'
    })
}

const borrarMedico = (req, res = response) => {

    res.json({
        ok:true,
        msg: 'DELETE - Médicos'
    })

}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}