const request = require('request')
const common = require('../../src/utils/common')

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
        if (req.body.object === 'page') {
            const body = req.body
            body.entry.forEach( async (entry) => {
                const event = entry.messaging[0]
               
                const sender = event.sender.id
                if (event.message) {
                    if (event.message.text === 'hai' || event.message.text === 'hi' 
                    || event.message.text === 'hi' || event.message.text === 'hey') {
                        await replyToSender(sender, 'What is your first name ? ') 
                        await replyToSender(sender, 'When is your birthday ?') 
                    }
  
                    const data = { 
                        message: event.message.text, 
                        sender_id :sender,
                        created_at: common.now
                    }
                    const insertData = db.query('INSERT INTO message SET ?', data)
                    if (!insertData) throw err
                } else if (event.postback) {
                    console.log('ini post')
                    console.log(event.postback)
                }
            })
            res.status(200).send('Message Received')
        } else {
            res.sendStatus(404)
        }
    })
}