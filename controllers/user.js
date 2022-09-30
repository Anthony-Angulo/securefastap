const asyncHandler = require("../middleware/async");
const User = require("../models/User");

exports.createUser = asyncHandler(async (req, res, next) => {

    const user = new User({
        nombre: req.body.nombre,
        apellidoPaterno: req.body.apellidoPaterno,
        apellidoMaterno: req.body.apellidoPaterno,
        username: req.body.username,
        password: req.body.password
    });

    User.create(user, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});

exports.logIn = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    User.login(req.body.usr, req.body.pwd, (err, data) => {
        if (err) {
            res.status(500).send({
              message: err.message,
            });
          } else {
            res.status(200).send(data);
          }
    });
});