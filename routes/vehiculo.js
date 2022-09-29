const express= require("express");
const {
    createVehiculo,
    getVehiculos,
    getVehiculo,
    getVehiculoByPlacas,
    updateVehiculo,
    deleteVehiculo
} = require("../controllers/vehiculo");

const router = express.Router();

router
    .route("/")
    .get(getVehiculos)
    .post(createVehiculo)
    .put(updateVehiculo);

router
    .route("/:id")
    .get(getVehiculo);
router
    .route("/placas/:placas")
    .get(getVehiculoByPlacas);

router
    .route("/:id")
    .delete(deleteVehiculo);

module.exports = router;