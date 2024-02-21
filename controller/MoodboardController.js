const express = require('express');
const router = express.Router();
const Moodboard = require('../model/MoodboardModel.js');
const ApiResponse = require('../model/ApiResponse.js'); 


// Get all moodboards
router.get('/', (req, res) => {
    Moodboard.find()
        .then(data => {
            const response = new ApiResponse(true, data, 'Data retrieved successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
});

// Add a new moodboard
router.post('/add', (req, res) => {
    const {  photoId, gifIds, colorPalette, fonts } = req.body;

    const newMoodboard = new Moodboard({
        photoId: photoId,
        gifIds: gifIds,
        colorPalette: colorPalette,
        fonts: fonts
    });

    newMoodboard.save()
        .then(() => {
            const response = new ApiResponse(true, null, 'Moodboard added successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(400).json(response);
        });
});

// Update an existing moodboard
router.put('/update/:id', (req, res) => {
    const moodboardId = req.params.id;
    const updateData = req.body;

    Moodboard.findByIdAndUpdate(moodboardId, updateData, { new: true })
        .then(updatedMoodboard => {
            if (!updatedMoodboard) {
                const response = new ApiResponse(false, null, 'Moodboard not found');
                return res.status(404).json(response);
            }
            const response = new ApiResponse(true, updatedMoodboard, 'Moodboard updated successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
});

// Delete moodboard by ID
router.delete('/delete/:id', (req, res) => {
    const moodboardId = req.params.id;

    Moodboard.findByIdAndDelete(moodboardId)
        .then(deletedMoodboard => {
            if (!deletedMoodboard) {
                const response = new ApiResponse(false, null, 'Moodboard not found');
                return res.status(404).json(response);
            }
            const response = new ApiResponse(true, null, 'Moodboard deleted successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
});

module.exports = router;
