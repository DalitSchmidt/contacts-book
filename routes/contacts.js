/**
 * This file includes all the RESTful API routes
 * In this case we have only the routes for 'Contact' entity/resource
 *
 * The following routes are open to use
 *
 * Accepted Content-Type: application/json
 * Base END POINT: /api/contacts
 * Available status codes: 200, 201, 204, 404, 422
 *
 * Method     Route                         Receive                Return                 Status
 * GET        /api/contacts                   -                    Array {Objects}        200 OK | 204 No Content
 * GET        /api/contacts/:contact_id     int {contact_id}       Object {Contact}       200 OK | 204 No Content
 * GET        /api/contacts/:page           int {page number}      Object {Contact}       200 OK | 204 No Content
 * GET        /api/insights                  -                     Object {Contact}       200 OK
 * POST       /api/contacts                 Payload: Object        Object {Contact}       201 Created | 422 Unproccessable Entity
 * DELETE     /api/contacts                 int {contact id}       Integer {Contact ID}   200 OK | 404 Not Found
 */

const models = require('../models')
const express = require('express')
const router = express.Router()
const NUM_RESULTS = 100
const Sequelize = require('sequelize')

// Get all the contacts, still limit it to max results
router.get('/', (req, res) => {
    let order = req.query.order || 'asc'
    let by = req.query.by || 'firstname'
    let page = req.query.page - 1 || false
    let query = { limit: NUM_RESULTS, order: [[by, order]] }

    if ( page )
        query.offset = page * NUM_RESULTS

    models.Contact.findAndCountAll( query ).then(contacts => {
        if ( contacts === null )
            res.status(204).send()
        else {

            res.json({
                count: contacts.count,
                contacts: contacts.rows
            })
        }
    })
})

// Filter by letter
router.get('/letter/:letter', (req, res) => {
    let letter = req.params.letter
    let order = req.query.order || 'asc'
    let by = req.query.by || 'firstname'
    let page = req.query.page - 1 || false

    let query = {
        where: { firstname: { $like: `${letter}%` } },
        attributes: ['id', 'firstname', 'lastname'],
        order: [[by, order]],
        limit: NUM_RESULTS
    }

    if ( page )
        query.offset = page * NUM_RESULTS

    models.Contact.findAndCountAll( query ).then(contacts => {
        if ( !contacts.count ) {
            res.status(204).send()
            res.end()
        } else {
            res.json({
                count: contacts.count,
                contacts: contacts.rows
            })
        }
    })
})

// Search contact
router.get('/search/:searchterm', (req, res) => {
    let searchterm = req.params.searchterm
    let page = req.query.page - 1 || false
    let query = {
        where: {
            $or: [
                Sequelize.where(Sequelize.fn('concat', Sequelize.col('firstname'), ' ', Sequelize.col('lastname')), {
                    like: `%${searchterm}%`
                })
            ]
        },
        attributes: ['id', 'firstname', 'lastname'],
        limit: NUM_RESULTS
    }

    if ( page )
        query.offset = page * NUM_RESULTS

    models.Contact.findAndCountAll( query ).then(contacts => {
        if ( contacts === null )
            res.status(204).send()
        else
            res.json({
                count: contacts.count,
                contacts: contacts.rows
            })
    })
})

/**
 * Get insights about the data
 * I chose to count the main emails domains and the states of the contacts
 */
router.get('/insights', (req, res) => {
    // Join and spread promises
    models.sequelize.Promise.join(
        // This query slices the @ and then counts and groups the domains
        models.sequelize.query("SELECT * FROM (SELECT substring_index(email, '@', -1) AS domain, COUNT(*) AS count FROM contacts GROUP BY substring_index(email, '@', -1) ORDER BY count DESC) domains WHERE count > 5", {
            type: models.sequelize.QueryTypes.SELECT,
            model: models.Contact
        }),
        // This query take the states then counts and groups it
        models.sequelize.query("SELECT RIGHT(address,2) AS state, COUNT(*) AS count FROM contacts GROUP BY RIGHT(address,2) ORDER BY count DESC", {
            type: models.sequelize.QueryTypes.SELECT,
            model: models.Contact
        })
    ).spread((domains, states) => {
        res.json({ domains, states })
    })
})

// Get specific single contact
router.get('/:contact_id', (req, res) => {
    let contact_id = req.params.contact_id

    models.Contact.findById( contact_id ).then( contacts  => {
        // If not found response with 204 No Content
        if ( contacts === null )
            res.status(204).end()
        else
            res.json( contacts )
    })
})

// Create new contact
router.post('/', (req, res) => {
    // Collect request body
    let contact = req.body

    models.Contact.create( contact ).then( result => {
        // Response with the last insert id of the new contact
        res.status(201).json({ contact_id: result.id })
    }).catch( error => {
        // Send 422 Unprocessable Entity status code with the first validation error
        res.status(422).json({'error': `${error.errors[0].type}: ${error.errors[0].path}`})
    })
})

// Delete single contact
router.delete('/:contact_id', (req, res) => {
    let contact_id = req.params.contact_id

    models.Contact.destroy({
        where: { id: req.params.contact_id },
    }).then(success => {
        res.json({ contact_id: contact_id })
    })
})

module.exports = router