"use strict";

let express = require("express");
let whatsappNotification = require("../controllers/WhatsappNotificacion.js");
let router = express.Router();

router.post("/sendWhatsapp", whatsappNotification.sendWhatsapp);

module.exports = router;
