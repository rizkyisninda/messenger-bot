'use strict'

const { createLogger, format, transports } = require('winston')

const Log = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    defaultMeta: { service: 'messenger-bot' },
    transports: [
        new transports.File({ filename: 'error-log.log', level: 'error' }),
        new transports.File({ filename: 'app-log.log' })
    ]
})

Log.stream = {
    write: function (message, encoding) {
        Log.info(message)
    }
}

module.exports = Log