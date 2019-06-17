const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const log = require('./utils/log')
const webhook = require('./modules/webhook')
const message = require('./modules/message')

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swaggerSpec')

app.use(bodyParser.json())



module.exports = (db) => {
    app.use(require('morgan')('combined', { 'stream': log.stream }))

    webhook.setup(app, db)
    message.setup(app, db)

    app.get('/api-docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    return app
}
