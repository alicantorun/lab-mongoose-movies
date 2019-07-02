const mongoose = require("mongoose");
const Celebrity = require("../models/Celebrity");

mongoose.connect("mongodb://localhost/lab-mongoose-movies", {
  useNewUrlParser: true
});

const celebrities = [
  {
    name: "Tom Cruise",
    occupation: "actor",
    catchPhrase: "Hey you, asshole!"
  },
  {
    name: "Beyonce",
    occupation: "singer",
    catchPhrase: "To the left, to the left!"
  },
  {
    name: "Buggs Bunny",
    occupation: "comedian",
    catchPhrase: "What's up, Doc?"
  }
];

Celebrity.insertMany(celebrities).then(data => {
  console.log(`Created ${data.length} celebrities`);
  mongoose.connection.close();
}).catch(err=>{
  console.log("Error while creating celebrities", err);
});