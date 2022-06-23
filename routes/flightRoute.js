const express = require('express');

const router = express.Router();
const controller = require('../controllers/flightController');
const models = require("../models/Flight");
const fs = require("fs");

let db = require("../flights.json");

router.get('/', controller.example);
var arr = {"id":0,"title":"Flight to Canada","time":"1pm","price":26000,"date":"26-06-2022"};

//get all flights
router.get("/flights", (req, res) => {
  const data = db;  
  return res.status(200).json({ data });
})

//get single flight
router.get("/flights/:id", (req, res) => {
    let id = req.params.id;
    let foundFlight = controller.findDb(db, id);

    if(foundFlight) {
      return res.status(200).json({ flights: foundFlight })
    } else {
      return res.status(404).json({ message: 'user not found' });
    }
});

//add new flight
router.post("/flights", (req, res) => {
   
    const newFlight =  controller.createDataBasedOnModel(arr, models.exampleModel);
    db.push(newFlight);
    const data = controller.writeToJsonDB(db, newFlight, res);
});

//update flight by id
router.put("/flights/:id", (req, res) => {

    let id = req.params.id;
    const newFlight =  controller.createDataBasedOnModel(arr, models.exampleModel);
    db = controller.updateDb(db ,id, newFlight)
    controller.writeToJsonDB(db, newFlight, res);
    
})


//delete all
router.delete("/flights", (req, res) => {
    db = []
    controller.writeToJsonDB(db, "All flights deleted", res);
 
});
  
//delete by id
router.delete("/flights/:id", (req, res) => {
    let id = req.params.id;
    db = controller.filterDb(db, id);
    controller.writeToJsonDB(db, 'Flight deleted', res);
    
});
module.exports = router;

