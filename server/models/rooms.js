var mongoose = require('mongoose');

//new schema
var RoomSchema = mongoose.Schema({
    room_number: Number,
    type: {
              type: String,
              enum: ["Standard", "Double", "Suite"]
    },
    beds: Number,
    max_occupancy: Number,
    cost_per_night: Number,
    reserved: [
        {
            from: String,
            to: String
        }
    ]
});

//new model
var Room = mongoose.model('rooms', RoomSchema);

module.exports = Room;
