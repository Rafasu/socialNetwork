'use strict'

const mongoose = require('mongoose');
const app = require('./app');
const port = 3800;

// Database Connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/socialNetwork', {useMongoClient: true})
                .then(()=>{
                    console.log("Conexion a la base de datos realizada correctamente.");

                    // Create Server
                    app.listen(port, () => {
                        console.log("Server running in localhost:3800");
                    });
                })
                .catch(err => { console.log(err)});
