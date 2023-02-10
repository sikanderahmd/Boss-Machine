const express = require('express');
const meetingsRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase } = require('./db.js')
    

meetingsRouter.get('/', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting()
    res.status(201).send(addToDatabase('meetings', newMeeting))
})

meetingsRouter.delete('/', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'))
})


module.exports = meetingsRouter;