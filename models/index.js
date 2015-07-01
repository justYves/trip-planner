var mongoose = require('mongoose');
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/trip-planner');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var placeSchema = new mongoose.Schema({
  address:  String,
  city:     String,
  state:    String,
  phone:    String,
  location: [Number,Number],
  status:   Number
});

var hotelSchema = new mongoose.Schema({
  name:    String,
  place: String,
  num_stars: Number,
  ameneties:  String //-> array.split ("") -> join(",")
});

var thingToDoSchema = new mongoose.Schema({
  name:    String,
  place: String,
  age_range:   String
});

var restaurantSchema = new mongoose.Schema({
  name:    String,
  place: String,
  cuisine: String,
  price: Number  // "$$$$" -> (length) ->  4
});


var Place = mongoose.model('Place', placeSchema);
var Hotel = mongoose.model('Hotel', hotelSchema);
var ThingToDo = mongoose.model('ThingToDo', thingToDoSchema);
var Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  Place: Place,
  Hotel: Hotel,
  ThingToDo: ThingToDo,
  Restaurant: Restaurant
};