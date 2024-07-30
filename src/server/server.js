const path = require('path')
const express = require('express')
const { getLocalIpAddress } = require('./utility')
const app = express()
const HOST = '0.0.0.0'
const PORT = 3003
const projectRoot = path.join(__dirname, '../../')
const pagesPath = path.join(projectRoot, 'pages/')

app.use('/pages', express.static(pagesPath))
app.get('/', (_, res) => res.status(200).sendFile('index.html', { root: projectRoot }))
app.listen(PORT, HOST)

console.log(`Running server on
	http://${HOST}:${PORT}
	http://${getLocalIpAddress()}:${PORT}`)
