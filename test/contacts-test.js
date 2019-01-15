/**
 * I wrote some tests with Chai and Mocha to execute end2end test with test mode DB
 * Sequelize will read the test-db from the config.json file
 * So here are some tests to examine the response codes and the response body
 */

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const should = chai.should()
const server = require('../app')
const faker = require('faker')
const db = require('../models')
chai.use( chaiHttp )

describe('Contacts REST API', () => {
    describe('GET /contacts', () => {
        it('Should GET all the contacts with the letter C', done => {
            chai.request(server).
                get('/api/contacts/letter/C').
                end((err, res) => {
                    res.should.have.status(200)
                    res.body.contacts.should.be.a('array')
                    res.body.count.should.be.a('number')
                    done()
                })
        })

        it('Should return empty results for the letter Z', done => {
            db.Contact.destroy({
                where: { firstname: { $like: 'Z%' } },
            }).then(success => {
                chai.request(server).
                    get('/api/contacts/letter/Z').
                    end((err, res) => {
                        res.should.have.status(204)
                        done()
                    })
            })
        })
    })

    describe('POST /contacts', () => {
        let email = faker.internet.email()

        it('Should create new contact', done => {
            chai.request(server).
                post('/api/contacts').
                set('Content-Type', 'application/json').
                send(JSON.stringify({
                    firstname: 'Test',
                    lastname: 'Test',
                    email,
                    phone: faker.phone.phoneNumberFormat(),
                    address: faker.address.city() + ', ' + faker.address.country()
                })).
                end((err, res) => {
                    console.log(res.body)
                    res.should.have.status(201)
                    res.body.contact_id.should.be.a('number')
                    done()
                })
        })

        it('Should response with 422 because of validation errors', done => {
            chai.request(server).
                post('/api/contacts').
                set('Content-Type', 'application/json').
                send(JSON.stringify({
                    firstname: 'Test',
                    lastname: 'Mode',
                    email: '',
                    phone: '',
                    address: faker.address.city() + ', ' + faker.address.country()
                })).
                end((err, res) => {
                    res.should.have.status(422)
                    done()
                })
        })
    })
})