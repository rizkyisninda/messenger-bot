
const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const Log = require('./utils/log')



module.exports = (db) => {
    app.use(require('morgan')('combined', { 'stream': Log.stream }))
    return app
}
