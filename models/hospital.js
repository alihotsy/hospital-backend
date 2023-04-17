const { Schema, model } = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type:String,
        required:true
    },
    img: {
        type:String
    },
    usuario: {
        required:true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection:'hospitales' });

HospitalSchema.methods.toJSON = function() {

    const {__v, ...resto} = this.toObject();

    return resto;
    
}

module.exports = model('Hospital', HospitalSchema);