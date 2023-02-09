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

apiRouter.get('/api/minions/:minionId', (req, res, next) => {
        const minionId = req.params.minionId;
        const allMinions = (getAllFromDatabase('minions'))
        const idInArray = allMinions.some(minion => {
            return minion.id === minionId
        })

        if(typeof Number(minionId) === 'number' && idInArray){
            
            //console.log(getFromDatabaseById('minions', minionId))
            res.send(getFromDatabaseById('minions', minionId))
    
        }
        else {
            console.log("ID is not a number or minion does not exist")
            res.status(404).send()
        }

})

apiRouter.post('/api/minions', (req, res, next) => {
    const newMinion = req.query
    if(newMinion){
        const num = 0
    }
})


module.exports = apiRouter;
