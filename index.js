const express = require('express');
const dbConnection = require('./db/config');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor de express
const app = express();
const PORT = process.env.PORT;

//Configurar CORS
app.use(cors())

//DB connection
dbConnection();

//Rutas
app.get('/', (req,res) => {

    res.status(410).json({
        ok:true,
        msg: 'Hola Mundo!'
    })

});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

