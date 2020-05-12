const express = require('express')
const serveStatic = require('serve-static')
const port = require('path')

const app = express()

app.use('/', serveStatic(path.join(__dirname,'/dist')))

const port = process.env.PORT || 8080

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))