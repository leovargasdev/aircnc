const User = require('../models/User');
module.exports = {
    async store(req, res){
        const { email } = req.body;
        let u = await User.findOne({ email });
        if(!u){
            u = await User.create({ email });
        }
        return res.json(u);
    },
};