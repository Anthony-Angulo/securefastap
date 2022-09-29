const connectionDB = require("../config/db");

const Visita = function (visita) {
    (this.idResidente = visita.idResidente),
    (this.idVehiculo = visita.idVehiculo),
    (this.numeroVisita = visita.numeroVisita),
    (this.usuario = visita.usuario)
};

Visita.create = (newVisita, result) => {
    connectionDB.query(
        `INSERT INTO ${process.env.DB}.visita SET ?`, newVisita,
        (err, res) => {
            if(err) {
                result(err, null);
                return;
            }

            result(null, {id: res.insertId, ...newVisita});
        }
    );
};

Visita.getAll = result => {
    connectionDB.query(
        `SELECT r.nombre AS residenteNombre, 
        r.apellidoPaterno AS residenteApellido, 
        r.direccion, 
        v.placas, 
        v.nombre AS vehiculoNombre, 
        v.apellidoPaterno AS vehiculoApellido,
        x.numeroVisita
        FROM ${process.env.DB}.visita AS x
        JOIN ${process.env.DB}.residente AS r
        ON x.idResidente = r.id
        JOIN ${process.env.DB}.vehiculo AS v
        ON x.idVehiculo = v.id
        WHERE x.idStatus=1
        `, (err, res) => {
            if (err) {
                result(err, null);
                return;
              }
        
              if (res.length) {
                result(null, res);
                return;
              }
        
              result({ kind: "not_found" }, null);
        }
    );
};

Visita.update = (numeroVisita, result) => {
    connectionDB.query(
        `UPDATE ${process.env.DB}.visita SET idStatus=2 WHERE numeroVisita='${numeroVisita}'`, 
        (err, res) => {
            if(err) {
                console.log("error: " , err);
                result(null, err);
                return;
            }
    
            result(null, res);
        }
    );
};


module.exports = Visita;