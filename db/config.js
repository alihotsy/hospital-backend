const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('Conexión exitosa a Mondongo');
    } catch (error) {
        console.log(error);
        throw Error('Error al conectarse a la DB');
    }
}

module.exports = dbConnection;