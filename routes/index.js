var express = require('express');
var router = express.Router();
var async = require('async');

var Place = require('../models').Place;
var Hotel = require('../models').Hotel;
var ThingToDo = require('../models').ThingToDo;
var Restaurant = require('../models').Restaurant;


/* GET home page. */
router.get('/', function(req, res, next) {
  var dbTables = [
    [Place, "place"],
    [Hotel, "hotel"],
    [ThingToDo, "thingToDo"],
    [Restaurant, "restaurant"]
  ];

  async.reduce(dbTables, {}, function(accum, item, done) {
    item[0].find().exec()
      .then(function(queryResult) {
        console.log("called!");
        accum[item[1]] = queryResult;
        done(null, accum);
      })
      .then(null, function(err) {
        done(err, accum);
      });
  }, function(err, result) {
    console.log("result" + result);
    console.log("error: " + err)
    res.render("index", {
      result: result
    });
  });
});

// router.get('/bower_components', function(req, res, next) {

// }


module.exports = router;