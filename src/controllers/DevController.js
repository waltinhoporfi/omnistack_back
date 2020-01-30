const axios = require('axios');
const Dev = require('../models/Dev');
const parserStringAsArray = require('../utils/parserStringAsArray');

//index, show, store, update, destroy

module.exports = {

    async index(request, response){
        const devs = await Dev.find();
        console.log(devs);
        return response.json(devs);
    },

    async store(request, response) {        
        const { github_username, techs, latitude, longitude } = request.body;

        let dev = await Dev.findOne({ github_username });
        if(!dev){
            console.log("~~~~~~~~~~~~Vai criar ->",github_username);
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            const { name = login, avatar_url, bio } = apiResponse.data;
            const techsArray = parserStringAsArray(techs);
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude],
            };
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location,
            })
        }else{
            console.log("Já existe ->",github_username);            
        }
        return response.json(dev);
    },

    async update(request, response){        //so p teste, so modifica as tecnologias (techs)
        const { github_username, techs } = request.body;                

        let dev = await Dev.findOne({ github_username });
        if(dev){            
            console.log("~~~~~~ dev.github_username ->",dev.github_username);
            const techsArray = parserStringAsArray(techs);
            dev = await Dev.update({
                techs: techsArray,
            })
        }else{
            console.log("~~~~~~~~~~~~~~ Não encontrou o dev");
        }
        return response.json(dev);
    },

    async delete(request, response){        //so p teste, so modifica as tecnologias (techs)
        const { github_username } = request.query;                

        let dev = await Dev.findOne({ github_username });
        if(dev){            
            console.log("~~~~~~ dev.github_username ->",dev.github_username);
            console.log("~~~~~~ dev.id ->",dev.id);
            dev = await Dev.deleteOne({
                _id: dev.id,
            })
        }else{
            console.log("~~~~~~~~~~~~~~ Não encontrou o dev");
        }
        return response.json(dev);
    }

};