const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const log = require('./utils/log')
const webhook = require('./modules/webhook')
const message = require('./modules/message')


app.use(bodyParser.json())



module.exports = (db) => {
    app.use(require('morgan')('combined', { 'stream': log.stream }))

    webhook.setup(app, db)
    message.setup(app, db)
    return app
}
