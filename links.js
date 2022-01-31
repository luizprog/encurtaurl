const Sequelize = require('sequelize');
const database = require('./db');
 
const Links = database.define('links', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    linkoriginal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    linkEncurtado: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
 
module.exports = Link;