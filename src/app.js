
const express = require('express')
const app = express()
const request = require('request')

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
const Log = require('./utils/log')
const common = require('../src/utils/common')

const replyToSender = async (sender, text) => {
    const response = await request({
        url: common.Url.graphFacekBook,
        qs: { access_token: process.env.ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: {
                text: text
            }
        }
    })
    return !!response
}

module.exports = (db) => {
    app.use(require('morgan')('combined', { 'stream': Log.stream }))

    app.get('/webhook/', (req, res) => {
        if (req.query['hub.verify_token'] === 'cobatoken') {
            return res.send(req.query['hub.challenge'])
        }
        res.send('wrong token')
    })

    app.post('/webhook', (req, res) => {
        if (req.body.object === 'page') {
            const body = req.body
            body.entry.forEach(function(entry) {
                const event = entry.messaging[0]
                const sender = event.sender.id
                if (event.message) {
                    console.log('testtt')
                    console.log(event.message)
                    replyToSender(sender, 'test reply')
                    const data = { 
                        message: event.message, 
                        sender_id :sender
                    }
                    const insertData = db.query('INSERT INTO message SET ?', data)
                    if (!insertData) throw err
                } else if (event.postback) {
                    console.log('ini post btack')
                    console.log(event.postback)
                }
            })
            res.status(200).send('Message Received')
        } else {
            res.sendStatus(404)
        }
    })
    return app
}
