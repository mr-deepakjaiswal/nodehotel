const express = require("express");
const router = express.Router();
const person = require("./../modules/Persons");

// person post method
router.post("/", async (req, res) => {
  try {
    const data = req.body; //asuming that request body contain the data

    //cerating nwe persones document using monggose model

    const newPerson = new person(data);

    //saving the nwe persone to database

    const response = await newPerson.save();
    console.log("data saved successfuly");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//person get method
router.get("/", async (req, res) => {
  try {
    const response = await person.find();
    console.log("data fetched");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//person work type get method
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await person.find({ work: workType });
      console.log("data fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
});

//update persons information
router.put("/:id", async (req, res) => {
  try {
    const personID = req.params.id;
    const updatedPersonData = req.body;

    const response = await person.findByIdAndUpdate(
      personID,
      updatedPersonData,
      {
        new: true, // return the updated document
        runValidators: true, // run mongoose validators
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data updated");
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete the document
router.delete("/:id", async (req, res) => {
  try {
    const personID = req.params.id;
    const response = await person.findByIdAndDelete(personID);

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("Data deleted");
    res.status(200).json({ message: "person data deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});
module.exports = router;
