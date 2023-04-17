const { Schema, model } = require('mongoose');

const MedicoSchema = Schema({
    nombre: {
        type:String,
        required:true
    },
    img: {
        type:String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required:true
    }
});

MedicoSchema.methods.toJSON = function() {

    const {__v, ...resto} = this.toObject();
    return resto;
}

module.exports = model('Medico', MedicoSchema);