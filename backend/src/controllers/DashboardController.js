const Spot = require('../models/Spot');

module.exports = {
    // Listagem dos spots do usuário
    async show(req, res){
        const { user_id: user } = req.headers;

        const spots = await Spot.find({ user });

        return res.json(spots);
    },
};