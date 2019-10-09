const Spot = require('../models/Spot');
const User = require('../models/User');

module.exports = {
    // Busca por Spots filtrados pelo tecnologia
    async index(req, res){
        const { tech } = req.query;
        const spots = await Spot.find({ techs: tech});

        return res.json(spots);
    },
    // Cadastro Novo Spot
    async store(req, res){
        const { filename: img } = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);
        
        // Caso o usuário não esteja cadastrado
        if(!user) return res.status(400).json({ error: 'Usuário não existe'});

        const spot = await Spot.create({
            user: user_id, company, img, price,
            techs: techs.split(',').map(tech => tech.trim()),
        });
        
        return res.json(spot);
    }
}