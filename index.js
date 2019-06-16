
const port = 5000
require('dotenv').config()
const db = require('./src/config/db')
const app = require('./src/app')(db)

app.listen(port, () => console.log(`App started and listening on port ${port}`))