var mongoose = require('mongoose');

//avoid mongoose library warning
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/hotels', {useMongoClient: true,});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
      console.log("Hotels db is connected");
});
