const {Sequelize} = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const db = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        define: {
            timestamps: false,
            freezeTableName: true
        }
    }
);

const connectDB = async() => {
    try{    
        await db.authenticate();
        console.log('DB connects');
    }catch(error){
        console.log('Error in DB connect:', error);
    }
}

module.exports = {
    db,
    connectDB
}