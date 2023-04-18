const { response } = require("express");
const Medico = require("../models/medico");
const Hospital = require("../models/hospital");

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

const actualizarMedico = async(req, res = response) => {
 
    const { id } = req.params;
    
    try {
    
        const [ medico, hospital ] = await Promise.all([
            Medico.findById(id),
            Hospital.findById(req.body.hospital)
        ]);
    
        if(!medico) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un médico con ese ID'
            })
        }
    
        if(!hospital) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un hospital con ese ID'
            })  
        }
    
        const medicoActualizado = await Medico.findByIdAndUpdate(
            id,{...req.body,usuario:req.uid}, {new:true}
        )
    
        res.json({
            ok:true,
            medico: medicoActualizado
        })
    
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
    }
}

const borrarMedico = async(req, res = response) => {

    const { id } = req.params;
    
    try {
    
        const medicoDB = await Medico.findById(id);
    
        if(!medicoDB) {
            return res.status(404).json({
                ok:false,
                msg: 'No existe un médico con ese ID'
            })
        }
    
        await Medico.findByIdAndDelete(id);

    
        res.json({
            ok:true,
            msg: 'Médico eliminado satisfactoriamente'
        })
    
    } catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'Hable con el ADMIN'
        })
    }


}

module.exports = {
    getMedicos,
    crearMedico,
    actualizarMedico,
    borrarMedico
}