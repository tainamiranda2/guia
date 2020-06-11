const Sequelize = require('sequelize');
const connection = new Sequelize('guiapergunta', 'root', '87684263', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;