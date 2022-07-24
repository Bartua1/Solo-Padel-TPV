const express = require("express");
const router = express.Router();

const ticket = require("../controllers/ticket.controller");

router.get("/", ticket.getTickets);

router.post("/", ticket.createTicket);

router.get("/:id", ticket.getTicket);

router.put("/:id", ticket.editTicket);

router.delete("/:id", ticket.deleteTicket);


module.exports = router;