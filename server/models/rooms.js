var mongoose = require('mongoose');

//new schema
var Room = mongoose.model('Room', {
    room_number: Number,
    type: {
              type: String,
              enum: ["Standard", "Double"]
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
var Room = mongoose.model('rooms', MovieSchema);

module.exports = Room;
