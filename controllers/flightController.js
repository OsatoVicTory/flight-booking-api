const fs = require("fs");
const models = require("../models/Flight");
let dbs = require("../flights.json");

exports.example = (req, res) => {
    console.log("example")
    res.send("Flight example")
}
let id_Generator = dbs.length > 0 ? dbs[dbs.length-1].id : 0;

// a fancy method like schema on mongoose, this is just to
// extract specific data from input array based on our created model in models folder
exports.createDataBasedOnModel = (array, model) => {
  let data = {};
  model.map((val,id) => {
    data[val] = array[val]
  });
  data['id'] = id_Generator++;
  return data;
}

exports.findDb = (db, id) => {
    const data = db.find(flight => {
        return flight.id == id;
    })
    return data;
}

exports.updateDb = (db, id, newFlight) => {
    for(var i=0;i<db.length;i++) {
        if(String(db[i].id) == id) {
          db[i] = newFlight;
          break;
        }
    }
    return db;
}

exports.filterDb = (db, id) => {
    let data = db.filter(flight => {
        return String(flight.id) != id;
    });
    return data;
}
exports.writeToJsonDB = (db, message, res) => {
    const stringedData = JSON.stringify(db, null, 2);
    
    fs.writeFileSync("flights.json", stringedData, function (err) {
      if(err) return res.status(500).json({ message: err });
    });
      
    return res.json({ message: "new flight created", flight: message});
}