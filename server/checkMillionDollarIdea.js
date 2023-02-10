
const checkMillionDollarIdea = (req, res, next) => {

    const { numWeeks, weeklyRevenue } = req.body;

    if(typeof Number(numWeeks) !== 'number' || typeof Number(weeklyRevenue) !== 'number'){
        res.status(400).send()
    }
    else {
        let totalRevenue = numWeeks * weeklyRevenue;
        if(totalRevenue >= 1000000){
            next()
        }
        else {
            res.status(400).send()
        }
    }
    
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
