const express = require('express');

// routes for making http requests
const router = express.Router();
const User = require('../model/UserModel.js');
const ApiResponse = require('../model/ApiResponse');   


router.get('/', (req, res) => {
    User.find()
        .then(data => {
            const response = new ApiResponse(true, data, 'Data retrieved successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
});

router.post('/add', (req, res) => {
    const { UserId, Name, Mobile, Email, Password, Type } = req.body;
    console.log(Email);
    var lowerCaseEmail = Email.toLowerCase();    // Convert email to lowercase
    console.log(lowerCaseEmail);
    // Check if the email already exists
    User.findOne({ Email: lowerCaseEmail })
        .then(existingUser => {
            if (existingUser) {
                const response = new ApiResponse(false, null, 'Email is already registered');
                return res.status(400).json(response);
            }

            // If email is not registered, create a new user
            const newUser = new User({
               UserId:UserId,
               Name:Name,
               Mobile:Mobile,
               Email:Email,
               Password:Password,
               Type:Type
            });

            newUser.save()
                .then(() => {
                    const response = new ApiResponse(true, null, 'User added successfully');
                    res.json(response);
                })
                .catch(err => {
                    const response = new ApiResponse(false, null, 'Error: ' + err);
                    res.status(400).json(response);
                });
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
});


router.post('/login', (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                const response = new ApiResponse(false, null, 'User not found');
                return res.status(404).json(response);
            }
            if (user.password !== password) {
                const response = new ApiResponse(false, null, 'Incorrect password');
                return res.status(401).json(response);
            }
            // At this point, user is authenticated
            const response = new ApiResponse(true, { token: user._id }, 'Login successful');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });
});

router.put('/update/:id', (req, res) => {
    const userId = req.params.id;
    const updateData = {
        Name: req.body.name,
        Mobile: req.body.mobile,
        Email: req.body.email,
        Password: req.body.password,
        Type: req.body.type,
    };

    User.findByIdAndUpdate(userId, updateData, { new: true })
        .then(updatedUser => {
            if (!updatedUser) {
                const response = new ApiResponse(false, null, 'User not found');
                return res.status(404).json(response);
            }
            const response = new ApiResponse(true, { token: updatedUser._id }, 'User updated successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });

});

// Delete user by ID
router.delete('/delete/:id', (req, res) => {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
        .then(deletedUser => {
            if (!deletedUser) {
                const response = new ApiResponse(false, null, 'User not found');
                return res.status(404).json(response);
            }
            const response = new ApiResponse(true, { token: deletedUser._id }, 'User deleted successfully');
            res.json(response);
        })
        .catch(err => {
            const response = new ApiResponse(false, null, 'Error: ' + err);
            res.status(500).json(response);
        });

});


module.exports = router;