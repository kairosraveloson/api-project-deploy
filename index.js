const express = require('express'); // Spécification du package à utiliser
const app = express(); // Définition de l'application, qui est une convention
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require("dotenv/config");

require('./models/dbConfig');
const postsRoutes = require('./routes/postsController');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use('/',postsRoutes); // Ce middleware surveille que cette fonction se déclenche seulement quand on est sur la racine + le chemin donné


//Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition :{
        info: {
            version : "1.1.0",
            title : "Eats project API",
            description : "Customer API Information",
            contact: {
                name : "Amazing developer"
            },
            servers:["http://localhost:3000"],
        }
    },
    // ['.routes/*.js']
    apis:["routes/postsController.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/eats-api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Servers is running at port : ${port}`));
