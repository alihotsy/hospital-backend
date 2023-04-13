const express = require('express');
const dbConnection = require('./db/config');
const cors = require('cors');
require('dotenv').config();

//Crear el servidor de express
const app = express();
const PORT = process.env.PORT;


//Configurar CORS
app.use(cors())

//Lectura y parseo del Body
app.use(express.json());

//DB connection
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

