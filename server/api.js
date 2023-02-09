const express = require('express');
const apiRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase } = require('./db.js')


apiRouter.get('/api/minions', (req, res, next) => {
    const allMinions = (getAllFromDatabase('minions'))
    res.send(allMinions)
})

apiRouter.get('/good', (req, res, next) => {
    res.send('good')
})


module.exports = apiRouter;
