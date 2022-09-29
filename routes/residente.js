const express= require("express");
const {
    createResidente,
    getResidentes,
    getResidente,
    updateResidente,
    deleteResidente
} = require("../controllers/residente");

const router = express.Router();

router
    .route("/")
    .get(getResidentes)
    .post(createResidente)
    .put(updateResidente);

router
    .route("/:id")
    .get(getResidente);

    router
    .route("/codigo/:code")
    .get(getResidente);


router
    .route("/:id")
    .delete(deleteResidente);

module.exports = router;