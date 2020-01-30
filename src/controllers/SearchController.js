const Dev = require('../models/Dev');
const parserStringAsArray = require('../utils/parserStringAsArray');

module.exports = {

    async index(request, response){
        console.log(request.query);
        const { latitude, longitude, techs } = request.query;  
        console.log("~~~~~~techs ->", techs);
        const techsArray = parserStringAsArray(techs);
        console.log("~~~~~~techsArray ->", techsArray);
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude,, latitude],
                    },
                    $maxDistance: 10000,
                },
            },
        });
        console.log("~~~~~~~devs ->", devs);
        return response.json({ devs });
    }
}