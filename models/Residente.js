const connectionDB = require("../config/db");

const Residente = function (residente) {
    (this.nombre = residente.nombre),
    (this.apellidoPaterno = residente.apellidoPaterno),
    (this.apellidoMaterno = residente.apellidoMaterno),
    (this.direccion = residente.direccion),
    (this.codigo = residente.codigo),
    (this.usuario =  residente.usuario)

};

Residente.create = (newResidente, result) => {
    connectionDB.query(
        `INSERT INTO ${process.env.DB}.residente SET ?`, newResidente,
        (err, res) => {
            if(err) {
                result(err, null);
                return;
            }

            result(null, {id: res.insertId, ...newResidente})
        }
    );
};

Residente.getAll = result => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.residente WHERE activo=1`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};

Residente.findbyid = (residenteId, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.residente WHERE id=${residenteId}`, (err, res) => {
            if(err) {
                result(err, null);
                return;
            }
      
            if(res) {
                result(null, res[0]);
                return;
            }
      
            result({ kind: "not_found"}, null);
        }
    );
};

Residente.update = (id, residente, result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.residente SET ? WHERE id=${id}`, residente, (err, res) => {
            if (err) {
                result(err, null);
                return;
              }
              result(null, { id: res.insertId, ...residente });
        }
    );
};

Residente.delete = (id , result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.residente SET activo=0 WHERE id=${id}`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};

module.exports = Residente;