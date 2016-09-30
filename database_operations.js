const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:postgres@127.0.0.1:5432/postgres');
const bangList = sequelize.define('banglist', {
  bang: {
    type: Sequelize.STRING,
  },
  query: {
    type: Sequelize.STRING
  }
}, {
  freezeTableName: true // Model tableName will be the same as the model name
});


//bang goes in, query comes out.
export function readBang(bang) {
    bangList.findOne({ where: {bang: bang} })
        .then((response) => {
            console.log("Returning this response: ", response);
            return response;
        });

}

//insert bang and query
export function writeBang(bang, query) {
    bangList.create({ 
        bang: bang, 
        query: query 
    });
}

//insert bang to delete row.
export function deleteBang(bang) {
    bangList.destroy({
        where: {
            bang: bang //this will be your id that you want to delete
        }
    })
    .then((response) => {
        console.log("Deleted", response);
    });
}

deleteBang("plm");
readBang("g");