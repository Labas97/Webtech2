const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

const mongoClient = require('../db/mongo')

app.use(cors(), bodyParser.json())

app.use(function (req, res, next) {
    console.log(`${req.path}`)
    next()
})

app.get('/', (req, res) => {
    res.send('Server is up.')
})

app.post('/signup', (req, res) => {
    mongoClient.db.collection('users').findOne(req.body, (err, result) => {
        if (err) {
            return console.log(err)
        }
        if (result !== null && req.body.email === result.email) {
            res.status(409).send("Email foglalt!")
        }
        else {
            mongoClient.db.collection('users').insertOne(req.body, (err, result) => {
                if (err) {
                    return console.log(err)
                }
            })
            res.status(201).end('Most már bejelentkezhetsz!')
        }
    })
})

app.post('/signin', (req, res) => {
    if (req.body.email === "" || req.body.password === "" || req.body.email === undefined || req.body.password === undefined) {
        res.status(203).send("Kevés adatot adtál meg!")
        return
    }
    mongoClient.db.collection('users').findOne(req.body, (err, result) => {
        if (err) {
            return console.log(err)
        }
        else if (result === null) {
            res.status(404).send("Nincs ilyen email, jelszó páros!")
        }
        else {
            res.status(200).send("Sikeres belépés!")
        }

    })
})

app.post('/warehouse', (req, res) => {
    mongoClient.db.collection('warehouse').findOne({"imei": req.body.imei}, (err, result) => {
        if (err) {
            return console.log(err)
        }
        if (result !== null && req.body.imei === result.imei) {
            res.status(409).send("Már van ilyen eszköz.")
        }
        else {
            mongoClient.db.collection('warehouse').insertOne(req.body, (err, result) => {
                if (err) {
                    return console.log(err)
                }
            })
            res.status(201).end()
        }
    })
})

app.get('/warehouse/imei', (req, res) => {
    console.log(req.query)
    mongoClient.db.collection('warehouse').findOne({ imei:parseInt(req.query.imei) }, (err, result) => {
        if (err) {
            return console.log(err)
        }
        if(result === null) {
            console.log('No match found based on query parameter.')
            return
        }
        res.status(200).send(result)
    })
})

app.get('/warehouse', (req, res) => {
    mongoClient.db.collection('warehouse').find({}).toArray((err, result) => {
        if (err) {
            return console.log(err)
        }
        res.status(200).send(result)
    })
})

const server = app.listen(3000, () => {
    console.log(`Server is listening on port: ${server.address().port}`)
})