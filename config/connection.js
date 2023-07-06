const { connect, connection } = require('mongoose');


  process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork';

connect(connectionString,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
});

module.exports = connection;
