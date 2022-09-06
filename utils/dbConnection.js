const { magenta, bold } = require('colorette');

const dbConnection = ()=>{
    console.log(magenta(bold("Database connected!")));
}
module.exports = dbConnection;      