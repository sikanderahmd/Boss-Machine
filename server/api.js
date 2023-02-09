const express = require('express');
const apiRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase } = require('./db.js')


apiRouter.get('/minions', (req, res, next) => {
    const allMinions = (getAllFromDatabase('minions'))
    console.log(req.body)
    res.send(allMinions)
})

apiRouter.get('/minions/:minionId', (req, res, next) => {
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

apiRouter.post('/minions', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body)
    res.status(201).send(newMinion)

})

apiRouter.put('/minions/:id', (req, res, next) => {
    const minionId = req.params.id
    const allMinions = (getAllFromDatabase('minions'))
    const idInArray = allMinions.some(minion => {
        return minion.id === minionId
    })

    if(typeof Number(minionId) !== 'number' || !idInArray){
        res.status(404).send()
    }
    else {

        const updatedMinion = updateInstanceInDatabase('minions', req.body)
        res.send(updatedMinion)
    }

})

apiRouter.delete('/minions/:id', (req, res, next) => {
    const minionId = req.params.id
    const deleted = deleteFromDatabasebyId('minions', minionId)
    if(deleted){
        res.status(204).send()
    }
    else {
        res.status(404).send()
    }
})


module.exports = apiRouter;
