const express = require('express');
const mongoose = require('mongoose'); // Add this line
const router = express.Router();
const Team = require('../model/TeamModel');
const ApiResponse = require('../model/ApiResponse'); 

// Get all teams
router.get('/', async (req, res) => {
  try {
    const teams = await Team.find();
    res.json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Create a new team
router.post('/add', async (req, res) => {
    try {
        const { members } = req.body;
        
        // Ensure members array contains ObjectIds
        if (!Array.isArray(members) || members.some(member => !mongoose.Types.ObjectId.isValid(member))) {
            return res.status(400).json({ success: false, data: null, message: 'Invalid members array' });
        }
        
        const newTeam = new Team({ members });
        await newTeam.save();
        const response = new ApiResponse(true, newTeam, 'Team added successfully');
        res.json(response);
    } catch (error) {
        console.error(error);
        const response = new ApiResponse(false, null, 'Error: ' + error);
        res.status(400).json(response);
    }
});

  
  
// Get team by ID
router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Update team by ID
router.put('/:id', async (req, res) => {
  try {
    const { members } = req.body;
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, { members }, { new: true });
    if (!updatedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(updatedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Delete team by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
