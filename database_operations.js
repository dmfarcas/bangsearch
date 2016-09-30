import Sequelize from 'sequelize'

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
export function readBang(bang, cb) {
    bangList.findOne({ where: {bang: bang} })
        .then((response) => {
            cb(response.dataValues.query); //sorry
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