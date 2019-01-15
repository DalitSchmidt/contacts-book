/**
 * Application main file
 * Here are all the middlewares in the project:
 * express, body-parser, routes, logs and
 *
 * Because it's only a RESTful API I don't use any views (or view engine)
 * because the ONLY mime type is JSON in this project
 */

const express = require('express')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()

app.use( logger('dev') )

// Static folder for client
app.use( express.static( path.join(__dirname, 'public') ) )
app.use( bodyParser.urlencoded({ extended: true }) )

// Set and parse incoming mime types to be JSON
app.use( bodyParser.json() )
app.use( cookieParser() )
app.use('/api/contacts', require('./routes/contacts'))

// Catch 404 errors if route not found
app.use((req, res) => {
    res.status(404).json({error: `Invalid route '${req.path}'`})
})

module.exports = app