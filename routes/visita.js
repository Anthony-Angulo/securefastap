const express= require("express");
const {
    createVisita,
    getVisitas,
    deleteVisita
} = require("../controllers/visita");

const router = express.Router();

router
    .route("/")
    .get(getVisitas)
    .post(createVisita);

router
    .route("/:numeroVisita")
    .delete(deleteVisita);

module.exports = router;