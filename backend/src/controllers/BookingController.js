const Booking = require('../models/Booking');
module.exports = {
    // Cadastro de reserva
    async store(req, res){
        const { user_id: user } = req.headers;
        const { spot_id: spot } = req.params;
        const { date, reason } = req.body;
        const booking = await Booking.create({
            user, spot, date, reason
        }).catch((error) => {
            // Data inserida incorreta
            if(error.name.includes("ValidationError")){
                return res.json({error: true});
            }
        });

        await booking.populate('spot').populate('user').execPopulate();
        // Verificando se o dono do spot está ativo no sistema
        const ownerSocket = req.onlineUsers[booking.spot.user];
        // Caso esteja online é gerado um alerta ao usuário 
        if(ownerSocket) req.io.to(ownerSocket).emit('booking_request', booking);

        return res.json(booking);
    },
};