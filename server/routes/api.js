var express  = require('express');
var app      = express();

// import model
var Room = require('../models/rooms');

//api function export
module.exports = function(app) {

//get all rooms
app.get('/api', function(req, res, next) {
   var rooms = Room.find().exec(function(err, data) {
        if(err) {
            return next(err);
        }
         console.log(data);
         res.json(data);
    });
});

//get single Room
    app.get('/api/:id', function(req, res, next) {
       var rooms = Room.findById(req.params.id, function(err, data) {
            if(err) {
                return next(err);
            }
            console.log(data);
            res.json(data);
        });
    });

//post new Room
    app.post('/api', function(req, res, next) {
        var Room = new Room({
           room_number: req.body.room_number,
           type: req.body.type,
           beds: req.body.beds,
           max_occupancy: req.body.max_occupancy,
           cost_per_night: req.body.cost_per_night,
           reserved: req.body.reserved,
        });
        Room.save(function(err, data) {
            if(err) {
                return next(err);
            }
            console.log(data);
            res.json(data);

         });

    });


//Delete Room
    app.delete('/api/:id', function(req, res) {
       Room.findByIdAndRemove(req.params.id, function(err, data) {
            res.json(data);
        });

    });

//Update Room
    app.put('/api/:id', function(req, res, next) {
        console.log("edit id");
        Room.findById(req.params.id, function(err, data) {
            data.room_number = req.body.room_number;
            data.room_number = req.body.room_number;
            data.type = req.body.type;
            data.beds = req.body.beds;
            data.max_occupancy = req.body.max_occupancy;
            data.cost_per_night = req.body.cost_per_night;
            data.reserved = req.body.reserved;

            data.save(function(err, data) {
                if(err) {
                    return next(err);
                }
                res.json(data);
            });
        });
    });

// search available room
    app.post('/api/search', function(req, res) {
    Room.find({
        type: req.body.roomType,
        beds: req.body.beds,
        max_occupancy: {$gt: req.body.guests},
        cost_per_night: {$gte: req.body.priceRange.lower, $lte: req.body.priceRange.upper},
        reserved: {
              //Check if any of the dates the room has been reserved for overlap with the requsted dates
              $not: {
                  $elemMatch: {from: {$lt: req.body.to.substring(0,10)}, to: {$gt: req.body.from.substring(0,10)}}
              }

          }
        }, function(err, rooms){
            if(err){
                res.send(err);
            } else {
                res.json(rooms);
            }
        });

    });

    app.post('/api/reserve', function(req, res) {

        console.log(req.body._id);

        Room.findByIdAndUpdate(req.body._id, {
            $push: {"reserved": {from: req.body.from, to: req.body.to}}
        }, {
            safe: true,
            new: true
        }, function(err, room){
            if(err){
                res.send(err);
            } else {
                res.json(room);
            }
        });

    });




};//End
