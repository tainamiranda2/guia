const Sequelize = require("sequelize");
const connection = require("./data-base");

const pergunta = connection.define('pergunta', {
    titulo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

pergunta.sync({ force: false }).then(() => {
    console.log("Tabela criada");
});
module.exports = pergunta;