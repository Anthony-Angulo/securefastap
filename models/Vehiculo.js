const connectionDB = require("../config/db");

const Vehiculo = function (vehiculo) {
    (this.placas = vehiculo.placas),
    (this.marca = vehiculo.marca),
    (this.modelo = vehiculo.modelo),
    (this.color = vehiculo.color),
    (this.nombre = vehiculo.nombre),
    (this.apellidoPaterno = vehiculo.apellidoPaterno),
    (this.apellidoMaterno = vehiculo.apellidoMaterno),
    (this.usuario = vehiculo.usuario)
};

Vehiculo.create = (newVehiculo, result) => {
    connectionDB.query(
        `INSERT INTO ${process.env.DB}.vehiculo SET ?`, newVehiculo,
        (err, res) => {
            if(err) {
                result(err, null);
                return;
            }

            result(null, {id: res.insertId, ...newVehiculo});
        }
    );
};

Vehiculo.getAll = result => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.vehiculo WHERE status=1`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};

Vehiculo.findbyid = (vehiculoId, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.vehiculo WHERE id=${vehiculoId}`, (err, res) => {
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

Vehiculo.findbyplacas = (placas, result) => {
    connectionDB.query(
        `SELECT * FROM ${process.env.DB}.vehiculo WHERE placas='${placas}'`, (err, res) => {
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

Vehiculo.update = (id, vehiculo, result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.vehiculo SET ? WHERE id=${id}`, vehiculo, (err, res) => {
            if (err) {
                result(err, null);
                return;
              }
              result(null, { id: res.insertId, ...vehiculo });
        }
    );
};

Vehiculo.delete = (id , result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.vehiculo SET status=0 WHERE id=${id}`, (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};

module.exports = Vehiculo;