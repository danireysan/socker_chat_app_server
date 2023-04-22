const mongoose = require('mongoose');

const dbConnection = async() => { 
    try {
       console.log('Iniciando conexión a la base de datos') 
    } catch (error) {
       console.log(error);
         throw new Error('Error en db - Hable con el administrador'); 
    }    
}

module.exports = {
    dbConnection
}