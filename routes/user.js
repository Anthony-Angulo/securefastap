const express= require("express");
const {
    createUser,
    logIn
} = require("../controllers/user");

const router = express.Router();

router
    .route("/")
    .post(createUser);

router
    .route("/login")
    .post(logIn);


module.exports = router;