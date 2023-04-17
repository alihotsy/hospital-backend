const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require('../helpers/actualizar-imagen');
const path = require('path');
const fs = require('fs');
const { response } = require('express');

const fileUpload = (req, res) => {

    const { coleccion, id } = req.params;

    const tiposValidos = ['hospitales','medicos','usuarios'];

    if(!tiposValidos.includes(coleccion)) {
      return res.status(400).json({
        ok:false,
        msg: 'No es un médico, usuario u hospital'
      })
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No hay ningún archivo'
        })
    }

    //Procesar la imagen
    const { imagen } = req.files;
    const nombreCortado = imagen.name.split('.') // wolverine.1.2.jpg
    const extension = nombreCortado[nombreCortado.length - 1];

    const extensionesValidas = ['png','jpg','jpeg','gif'];

    if(!extensionesValidas.includes(extension)) {
       return res.status(400).json({
        ok:false,
        msg: 'No es una extensión permitida'
       })
    }

    const nombreArchivo = `${uuidv4()}.${extension}`

    const path = `./uploads/${coleccion}/${nombreArchivo}`;


    // Use the mv() method to place the file somewhere on your server
    imagen.mv(path, async(err) => {
        if (err) {
            return res.status(500).json({
                ok:false,
                msg: 'Error al mover la imagen'
            })

        }

        
        const isUpdated = await actualizarImagen(coleccion, id, nombreArchivo);

        if(!isUpdated) { 
            return res.json({
                ok:false,
                msg: 'Archivo no subido'
            })
        }

        res.json({
            ok:true,
            msg: 'Archivo subido',
            nombreArchivo
        })
    
    });

    
}

const retornaImagen = (req, res = response) => {

    const { coleccion, foto } = req.params;

    const pathImg = path.join( __dirname, `../uploads/${ coleccion }/${ foto }`);

    if(!fs.existsSync(pathImg)) {
        return res.sendFile(path.join( __dirname, `../uploads/no-img.png`))
    }

    res.sendFile(pathImg);

}

module.exports = { 
    fileUpload,
    retornaImagen
}