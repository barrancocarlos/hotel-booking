var express  = require('express');
var app      = express();

// import model
var Room = require('../models/');

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
           title: req.body.title,
           year: req.body.year,
           genre: req.body.genre,
           priority: req.body.priority
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
            data.title = req.body.title;
            data.year = req.body.year;
            data.genre = req.body.genre;
            data.priority = req.body.priority;

            data.save(function(err, data) {
                if(err) {
                    return next(err);
                }
                res.json(data);
            });
        });
    });
};
