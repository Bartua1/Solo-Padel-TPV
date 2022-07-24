const Ticket = require("../models/ticket");

const ticketCtrl = {};

ticketCtrl.getTickets = async (req, res, next) => {
    try{
        const ticekts = await Ticket.find();
        res.json(ticekts);
    }
    catch(error){
        res.json({status: "Couldnt retrieve Tickets"});
        console.log(error);
    }
}

ticketCtrl.createTicket = async (req, res, next) => {
    try{
        const ticket = new Ticket({
            client: req.body.client,
            date: req.body.date,
            clientproducts: req.body.clientproducts,
            total: req.body.total
        });
        await ticket.save();
        res.json({ status: "Ticket created" });
    }
    catch(error){
        res.json({status: "Couldnt crete Ticket"});
        console.log(error);
    }
}

ticketCtrl.getTicket = async (req, res, next) => {
    try{
        const { id } = req.params;
        const ticket = await Ticket.findById(id);
        res.json(ticket);
    }
    catch(error){
        res.json({status: "Couldnt get Ticket"});
        console.log(error);
    }
}
ticketCtrl.editTicket = async (req, res, next) => {
    try{
        const { id } = req.params;
        await Ticket.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.json({ status: "Ticket Updated" });
    }
    catch(error){
        res.json({status: "Couldnt edit Ticket"});
        console.log(error);
    }
}

ticketCtrl.deleteTicket = async (req, res, next) => {
    try{
        await Ticket.findByIdAndRemove(req.params.id);
        res.json({ status: "Ticket Deleted" });
    }
    catch(error){
        res.json({status: "Couldnt delete Ticket"});
        console.log(error);
    }
}

module.exports = ticketCtrl;