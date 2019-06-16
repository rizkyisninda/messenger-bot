
const Response = require('../utils/response')
const common = require('../utils/common')
module.exports.setup = (app, db) => {
    app.get('/messages', async (req, res) => {
        try {
            const page = (req.query && req.query.page) ? req.query.page : 1
            const limit = (req.query && req.query.limit) ? req.query.limit : 5
            const offset = page > 1 ? ((page * limit) - limit) : 0
            const data = await db.query('SELECT * from message where deleted_at is NULL LIMIT ?, ?', [offset, limit])
            if (data && data.length === 0) {
                return res.json(new Response(false, 'Data not found', null))
            }
            return res.json(new Response(true, 'success', data))
        } catch (error) {
            return res.json(new Response(false, error.message, error))
        }
    })

    app.get('/message/:id', async (req, res) => {
        try {
            const data = await db.query('SELECT * from message where id =? and deleted_at IS null ', [req.params.id])
            if (data && data.length === 0) {
                return res.json(new Response(false, 'Data not Found', null))
            }
            return res.json(new Response(true, 'success', data[0]))
        } catch (error) {
            return res.json(new Response(false, error.message, error))
        }
    })

    app.post('/message/:id', (req, res) => {
        const data = db.query('update  message set deleted_at = ? where id = ?', [common.now, req.params.id])
        if (!data) {
            res.json(new Response(false, 'error from server', null))
        }
        res.json(new Response(true, 'success', data))
    })
}