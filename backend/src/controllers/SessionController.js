const User = require('../models/User');
module.exports = {
    // Cadastro e Login
    async store(req, res){
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if(!user){ // Caso o usuário não exista é criado uma nova conta
            user = await User.create({ email, password });
        } else if (user.password !== password){
            user = { error: true };
        }
        return res.json(user);
    },
};