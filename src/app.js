
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const log = require('./utils/log')
const webhook = require('./modules/webhook')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))



module.exports = (db) => {
    app.use(require('morgan')('combined', { 'stream': log.stream }))

    webhook.setup(app, db)
    return app
}
