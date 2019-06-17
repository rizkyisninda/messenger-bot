
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerDefinition = {
    info: {
        title: 'Messager Bot',
        version: '1.0.0',
        description: ''
    },
    host: 'localhost:5000',
    basePath: ''
}

const options = {
    swaggerDefinition: swaggerDefinition,
    apis: ['./src/modules/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = swaggerSpec