const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true
    },
    img: {
        type:String
    },
    role: {
        type:String,
        required:true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default:false
    }
}, /*{versionKey:false}*/);

UsuarioSchema.methods.toJSON = function() {

    const {__v, password, _id, ...resto} = this.toObject();

    return {
        uid: _id,
        ...resto
    };
    
}

module.exports = model('Usuario', UsuarioSchema);