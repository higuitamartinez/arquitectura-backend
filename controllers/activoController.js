const { QueryTypes } = require('sequelize');
const {db} = require('../config/db');

const getInformacionFormulario = async(req, res) => {
    try{
        const categorias = await db.query('SELECT * FROM categoria', {
            type: QueryTypes.SELECT
        });
        const columnas = await db.query('SELECT * FROM activo_columna', {
            type: QueryTypes.SELECT
        });
        res.status(200).json({
            categorias,
            columnas
        });
    }catch(error){
        console.log('Ocurrió un error en el formulario');
    }
}

const getActivos = async(req, res) => {
    try{
        const activos = await db.query('SELECT a.*, c.nombre as categoriaNombre FROM activo a INNER JOIN categoria c ON a.categoria_id = c.categoria_id ORDER BY a.activo_id DESC', {
            type: QueryTypes.SELECT
        });

        res.status(200).json({
            activos
        });
    }catch(error){
        console.log('Ocurrió un error en el servidor');
    }
}

const getActivo = async(req, res) => {
    const {activo_id} = req.params;
    try{
        const activo = await db.query(`SELECT a.*, c.nombre as categoriaNombre FROM activo a INNER JOIN categoria c ON a.categoria_id = c.categoria_id WHERE a.activo_id = ${activo_id}`, {
            type: QueryTypes.SELECT
        });
        if(activo.length === 0){
            return res.status(404).json({
                msg: 'El activo no está registrado'
            });
        }
        res.status(200).json({
            activo
        });
    }catch(error){
        console.log('Ocurrió un error en el servidor');
    }
}

const crearActivo = async(req, res) => {
    const {codigo, nombre, categoria_id} = req.body;
    if(!codigo || codigo.trim() === '' || !nombre || nombre.trim() === '' || !categoria_id){
        return res.status(401).json({
            msg: 'Error al insertar'
        })
    }
    try{
        const activoExiste = await db.query(`SELECT a.activo_id FROM activo a WHERE a.codigo = '${codigo}'`, {
            type: QueryTypes.SELECT
        });
        if(activoExiste.length > 0){
            return res.status(401).json({
                msg: 'El activo ya está registrado'
            })
        }
        
        let columnas = 'codigo, nombre, categoria_id';
        let valores = `'${codigo.trim()}', '${nombre.trim()}', '${categoria_id}'`;
        const activoColumnas = await db.query('SELECT * FROM activo_columna', {
            type: QueryTypes.SELECT
        });

        if(activoColumnas.length > 0){
            for(let activoColumna of activoColumnas){
                if(req.body[activoColumna.nombre_bd] && req.body[activoColumna.nombre_bd].trim() !== ''){
                    columnas += `,${activoColumna.nombre_bd}`;
                    valores += `,'${req.body[activoColumna.nombre_bd].trim()}'`
                }
            }
        }
        
        await db.query(`INSERT INTO activo (${columnas}) VALUES (${valores})`, {
            type: QueryTypes.INSERT
        });
        res.status(200).json({
            msg: 'Activo creado'
        });
    }catch(error){
        console.log('Ocurrió un error en el servidor');
    }
}

const editarActivo = async(req, res) => {
    const {activo_id} = req.params;
    const {codigo, nombre, categoria_id} = req.body;
    if(!codigo || codigo.trim() === '' || !nombre || nombre.trim() === '' || !categoria_id){
        return res.status(401).json({
            msg: 'Error al insertar'
        })
    }
    try{
        const activo = await db.query(`SELECT a.activo_id FROM activo a WHERE a.activo_id = ${activo_id}`, {
            type: QueryTypes.SELECT
        });
        if(activo.length === 0){
            return res.status(401).json({
                msg: 'El activo no está registrado'
            });
        }
        const activoExiste = await db.query(`SELECT a.activo_id FROM activo a WHERE a.codigo = '${codigo}' AND a.activo_id <> ${activo_id}`, {
            type: QueryTypes.SELECT
        });
        if(activoExiste.length > 0){
            return res.status(401).json({
                msg: 'El activo ya está registrado'
            })
        }
        
        let valores = `codigo='${codigo.trim()}', nombre='${nombre.trim()}', categoria_id='${categoria_id}'`;
        const activoColumnas = await db.query('SELECT * FROM activo_columna', {
            type: QueryTypes.SELECT
        });

        if(activoColumnas.length > 0){
            for(let activoColumna of activoColumnas){
                if(req.body[activoColumna.nombre_bd] && req.body[activoColumna.nombre_bd].trim() !== ''){
                    valores += `,${activoColumna.nombre_bd}='${req.body[activoColumna.nombre_bd].trim()}'`
                }
            }
        }
        
        await db.query(`UPDATE activo a SET ${valores} WHERE a.activo_id=${activo_id}`, {
            type: QueryTypes.INSERT
        });
        res.status(200).json({
            msg: 'Activo creado'
        });
    }catch(error){
        console.log(error);
        console.log('Ocurrió un error en el servidor');
    }
}

const eliminarActivo = (req, res) => {

}

module.exports = {
    getActivos,
    getActivo,
    crearActivo,
    editarActivo,
    eliminarActivo,
    getInformacionFormulario
}