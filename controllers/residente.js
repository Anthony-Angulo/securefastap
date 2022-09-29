const asyncHandler = require("../middleware/async");
const Residente = require("../models/Residente");

exports.createResidente = asyncHandler(async (req, res, next) => {

    const residente = new Residente({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        direccion: req.body.direccion,
        codigo: req.body.codigo,
        usuario: req.body.usuario
    });

    Residente.create(residente, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.getResidentes = asyncHandler(async (req, res, next) => {
    Residente.getAll((err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.getResidente = asyncHandler(async (req, res, next) => {
    Residente.findbyid(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Residente con El id ${req.params.id} No Encontado`,
              });
            } else {
              res.status(500).send({
                message: `Error Al Buscar Residente Con El id ${req.params.id}`,
              });
            }
          } else {
            res.status(200).send(data);
          } 
    });
});

exports.updateResidente = asyncHandler(async (req, res, next) => {

    const residente = new Residente({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoMaterno,
        direccion: req.body.direccion,
        codigo: req.body.codigo,
        usuario: req.body.usuario
    });

    Residente.update(req.body.id, residente, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.deleteResidente = asyncHandler(async (req, res, next) => {
    Residente.delete(req.params.id, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});



