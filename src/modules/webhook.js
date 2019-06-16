const request = require('request')
const common = require('../utils/common')
const Response = require('../utils/response')

module.exports.setup = (app, db) => {
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

    app.get('/webhook/', (req, res) => {
        if (req.query['hub.verify_token'] === 'cobatoken') {
            return res.send(req.query['hub.challenge'])
        }
        res.send('wrong token')
    })

    app.post('/webhook', (req, res) => {
        try {
            if (req.body.object === 'page') {
                const body = req.body
                body.entry.forEach(async (entry) => {
                    const event = entry.messaging[0]

                    const sender = event.sender.id
                    if (event.message) {
                        if (event.message.text === 'hai' || event.message.text === 'hi' ||
                        event.message.text === 'hi' || event.message.text === 'hey') {
                            await replyToSender(sender, 'What is your first name ? ')
                            await replyToSender(sender, 'When is your birthday ?')
                        }

                        const data = {
                            message: event.message.text,
                            sender_id: sender,
                            created_at: common.now
                        }
                        db.query('INSERT INTO message SET ?', data)
                    } else if (event.postback) {
                        console.log('ini post')
                        console.log(event.postback)
                    }
                })
                return res.json(new Response(true, 'message received', null))
            }
            return res.json(new Response(false, 'message not received', null))
        } catch (error) {
            return res.json(new Response(false, error.message, error))
        }
    })
}