
const response = require('../utils/response')
const common = require('../utils/common')
module.exports.setup = (app, db) => {
    
    app.get('/messages', (req, res) => {
        const page = (req.query && req.query.page) ? req.query.page : 1
        const limit = (req.query && req.query.limit) ? req.query.limit : 5
        const offset = page > 1 ? ((page * limit) - limit) : 0
        const data = db.query('SELECT * message where deleted_at = null LIMIT ?, ?', [offset, limit])
        if (!data) {
            res.json(new response(false, 'error from server', null))
        }
    })

    app.get('/message/:id', (req, res) => {
        const data = db.query('SELECT * message where id =? and deleted_at = null ', [req.params.id])
        if (!data) {
            res.json(new response(false, 'error from server', null))
        }
        res.json(new response(true, 'success', data))
    })

    app.post('/message/:id', (req, res) => {
        const data = db.query('update  message set deleted_at = ? where id = ?', [common.now, req.params.id])
        if (!data) {
            res.json(new response(false, 'error from server', null))
        }
        res.json(new response(true, 'success', data))
    })
}