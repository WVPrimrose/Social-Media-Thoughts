const { connect, connection } = require ('mongoose');

const connectionString = 'mongodb'

connect(connectionString);

module.exports = connection;