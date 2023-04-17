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
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/uploads', require('./routes/uploads'));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})

