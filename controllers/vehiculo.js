const asyncHandler = require("../middleware/async");
const Vehiculo = require("../models/Vehiculo");

exports.createVehiculo = asyncHandler(async (req, res, next) => {

    const vehiculo = new Vehiculo({
        placas: req.body.placas,
        marca: req.body.marca,
        modelo: req.body.modelo,
        color: req.body.color,
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        usuario: req.body.usuario
    });

    Vehiculo.create(vehiculo, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.getVehiculos = asyncHandler(async (req, res, next) => {
    Vehiculo.getAll((err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.getVehiculo = asyncHandler(async (req, res, next) => {
    Vehiculo.findbyid(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Vehiculo con El id ${req.params.id} No Encontado`,
              });
            } else {
              res.status(500).send({
                message: `Error Al Buscar Vehiculo Con El id ${req.params.id}`,
              });
            }
          } else {
            res.status(200).send(data);
          } 
    });
});

exports.getVehiculoByPlacas = asyncHandler(async (req, res, next) => {
    Vehiculo.findbyplacas(req.params.placas, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Vehiculo con las placas ${req.params.placas} No Encontado`,
              });
            } else {
              res.status(500).send({
                message: `Error Al Buscar Vehiculo Con las placas ${req.params.placas}`,
              });
            }
          } else {
            res.status(200).send(data);
          } 
    });
});

exports.updateVehiculo = asyncHandler(async (req, res, next) => {

    const vehiculo = new Vehiculo({
        placas: req.body.placas,
        marca: req.body.marca,
        modelo: req.body.modelo,
        color: req.body.color,
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        usuario: req.body.usuario
    });

    Vehiculo.update(req.body.id, vehiculo, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.deleteVehiculo = asyncHandler(async (req, res, next) => {
    Vehiculo.delete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

