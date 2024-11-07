const { QueryTypes } = require("sequelize");
const { db } = require("../config/db");

const getColumnas = async(req, res) => {
    try{
        const columnas = await db.query('SELECT * FROM activo_columna', {
            type: QueryTypes.SELECT
        });
        res.status(200).json({
            columnas
        });
    }catch(error){
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
}

const crearColumna = async(req, res) => {
    const {nombre_bd, nombre_frontend} = req.body;
    console.log(req.body);
    if(!nombre_bd || nombre_bd.trim() === '' || !nombre_frontend || nombre_frontend === ''){
        return res.status(401).json({
            msg: 'Error al insertar'
        });
    }
    try{
        const columnaExiste = await db.query(`SELECT ac.activo_columna_id FROM activo_columna ac WHERE ac.nombre_bd = '${nombre_bd}'`, {
            type: QueryTypes.SELECT
        }); 
        if(columnaExiste.length > 0){
            return res.status(401).json({
                msg: 'La columna ya está registrada'
            });
        }
        await db.query(`INSERT INTO activo_columna (nombre_bd, nombre_frontend) VALUES ('${nombre_bd}', '${nombre_frontend}')`);
        await db.query(`ALTER TABLE activo ADD COLUMN ${nombre_bd} VARCHAR(255)`);
        res.status(200).json({
            msg: 'Columna creada'
        });
    }catch(error){
        res.status(500).json({
            msg: 'Ocurrió un error en el servidor'
        });
    }
}

const eliminarColumna = () => {

}

module.exports = {
    getColumnas,
    crearColumna
}