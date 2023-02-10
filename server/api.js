const express = require('express');
const apiRouter = express.Router();
const { createMeeting,
    getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId,
    deleteAllFromDatabase } = require('./db.js')

const  checkMillionDollarIdea  = require('./checkMillionDollarIdea.js')

//Minion Routes

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


//Idea Routes

apiRouter.get('/ideas', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas')
    res.send(allIdeas)
})

apiRouter.post('/ideas', checkMillionDollarIdea, (req, res, next) => {

        const newIdea = addToDatabase('ideas', req.body)
        res.status(201).send(newIdea)
})

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const allIdeas = getAllFromDatabase('ideas');
    const found = allIdeas.some(idea => {
        return idea.id === ideaId
    })

    if(found && (typeof Number(ideaId) === 'number')){

        res.send(getFromDatabaseById('ideas', ideaId))
    }
    else {
        res.status(404).send('Not valid Id')
    }

})

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const allIdeas = getAllFromDatabase('ideas');
    const idInArray = allIdeas.some(idea => {
        return idea.id === ideaId })

    if(idInArray && (typeof Number(ideaId) === 'number')){
        const updatedIdea = updateInstanceInDatabase('ideas', req.body)
        res.send(updatedIdea)
    }
    else {
        res.status(404).send()
    }
})

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
    const ideaId = req.params.ideaId;
    const allIdeas = getAllFromDatabase('ideas');
    const idInArray = allIdeas.some(idea => {
        return idea.id === ideaId
    })

    if(idInArray && (typeof Number(ideaId) === 'number')){
        res.status(204).send(deleteFromDatabasebyId('ideas', ideaId))
    }
    else {
        res.status(404).send()
    }
})

//Meeting routes

apiRouter.get('/meetings', (req, res, next) => {
    res.send(getAllFromDatabase('meetings'))
})

apiRouter.post('/meetings', (req, res, next) => {
    const newMeeting = createMeeting()
    res.status(201).send(addToDatabase('meetings', newMeeting))
})

apiRouter.delete('/meetings', (req, res, next) => {
    res.status(204).send(deleteAllFromDatabase('meetings'))
})

module.exports = apiRouter;
