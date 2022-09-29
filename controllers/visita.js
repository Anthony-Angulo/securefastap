const asyncHandler = require("../middleware/async");
const Visita = require("../models/Visita");

exports.createVisita = asyncHandler(async (req, res, next) => {

    const visita = new Visita({
        idResidente: req.body.idResidente,
        idVehiculo: req.body.idVehiculo,
        numeroVisita: req.body.numeroVisita,
        usuario: req.body.usuario
    });

    Visita.create(visita, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.getVisitas = asyncHandler(async (req, res, next) => {
    Visita.getAll((err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.deleteVisita = asyncHandler(async (req, res, next) => {
    Visita.update(req.params.numeroVisita, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});