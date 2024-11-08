// controllers/pets.js
// const Pet = require('../models/pet.js');
const express = require("express");
const Track = require("../models/track.jsx");
const router = express.Router();

//Write your routes/controller functions here

//CREATE - POST -/tracks
router.post("/", async (req, res) => {
  console.log("create");
  try {
    const createdTrack = await Track.create(req.body);
    res.status(201).json(createdTrack);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//READ - GET- /tracks
router.get("/", async (req, res) => {
  try {
    const foundTracks = await Track.find();
    res.status(200).json(foundTracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//READ - GET - /tracks/:id
router.get("/:id", async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.id);
    if (!foundTrack) {
      res.status(404);
      throw new Error("Track not found.");
    }
    res.status(200).json(foundTrack);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// DELETE - DELETE - /pets/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Track.findByIdAndDelete(id);
    if (deleted) {
      return res.status(200).send("Track Deleted");
    }
    throw new Error("Track not found");
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// UPDATE - PUT - /tracks/:id
router.put("/:id", async (req, res) => {
  try {
    const updatedTrack = await Track.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updatedTrack) {
      res.status(404);
      throw new Error("Track not found.");
    }
    res.status(200).json(updatedTrack);
  } catch (error) {
    // Add code for errors
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

module.exports = router;
