const express = require("express");
const fs = require("fs");

const router = express.Router();
const controller = require("../controller/flightController");
const { model } = require("../models/Flight");

const arr = {
    title: "Flight to Canada",
    time: "1pm",
    price: 26000,
    date: "26-06-2022"
}

router.get("/", (req, res) => {

    let DB = JSON.parse(fs.readFileSync("flight.json", "utf8"));
    res.status(200).json({ "message" : DB });
})

router.get("/:id", (req, res) => {

    let DB = JSON.parse(fs.readFileSync("flight.json", "utf8"));
    const data = controller.findInJsonDB(DB, req.params.id)
    if(data) res.status(200).json({ "message": data });
    else res.status(404).json({ "message": "No Flight like this" })
})

//post
router.post("/add", (req, res) => {

    let DB = JSON.parse(fs.readFileSync("flight.json", "utf8"));
    const createData = controller.extractDataBasedOnModel(model, arr);
    DB.push(createData);
    const jsonData = JSON.stringify(DB, null, 4);
    

    fs.writeFile("flight.json", jsonData, function (err) {
        if(err) {
            return res.status(500).json({ "message": err })
        }

        res.status(200).json({ "message": "Flight added successfully" });
    })
});

//put
router.put("/update/:id", (req, res) => {

    let DB = JSON.parse(fs.readFileSync("flight.json", "utf8"));
    const updatedData = controller.updateJsonDB(DB, arr);
    const jsonData = JSON.stringify(updatedData, null, 4);

    fs.writeFile("flight.json", jsonData, function (err) {
        if(err) {
            return res.status(500).json({ "message": err })
        }

        res.status(200).json({ "message": "Flight updated successfully" });
    })
})

//delete
router.delete("/delete/:id", (req, res) => {

    let DB = JSON.parse(fs.readFileSync("flight.json", "utf8"));
    const updatedData = controller.filterJsonDB(DB, req.params.id);
    const jsonData = JSON.stringify(updatedData, null, 4);

    fs.writeFile("flight.json", jsonData, function (err) {
        if(err) {
            return res.status(500).json({ "message": err })
        }

        res.status(200).json({ "message": "Flight deleted successfully" });
    })
})

module.exports = router;
