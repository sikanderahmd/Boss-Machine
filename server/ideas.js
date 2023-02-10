const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId } = require('./db.js')

const  checkMillionDollarIdea  = require('./checkMillionDollarIdea.js')


ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas')
    res.send(allIdeas)
})

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {

        const newIdea = addToDatabase('ideas', req.body)
        res.status(201).send(newIdea)
})

ideasRouter.get('/:ideaId', (req, res, next) => {
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

ideasRouter.put('/:ideaId', (req, res, next) => {
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

ideasRouter.delete('/:ideaId', (req, res, next) => {
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



module.exports = ideasRouter;