const connectionDB = require("../config/db");
const bcrypt = require("bcrypt");

const User = function (user) {
    (this.nombre = user.nombre),
    (this.apellidoPaterno = user.apellidoPaterno),
    (this.apellidoMaterno = user.apellidoMaterno),
    (this.username = user.username),
    (this.password = user.password)
}

User.create = async (newUser, result) => {
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    connectionDB.query(
        `INSERT INTO ${process.env.DB}.usuario SET ? `, newUser , (err, res) => {
            if(err) {
                result(err, null);
                return;
            }

            result(null, {id: res.insertId, ...newUser})
        }
    )
}

User.login = async (usr, pwd, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.usuario WHERE username='${usr}'`, async (err, res) => {
            if(err) {
                result(err, null);
                return;
            }
            if(res) {
                console.log(res[0].password)
                console.log(pwd)
                const validpwd = await bcrypt.compare(pwd, res[0].password);
                console.log(validpwd)
                if(validpwd) {
                    result(null, res[0]);
                    return;
                } else {
                    result(err, null);
                    return;
                }
            } else {
                result(err, null);
                return;
            }
        }
    );
};

module.exports = User;