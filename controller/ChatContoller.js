const express = require('express');

// roustes for making http requests
const rouster = express.Router();
const Chat = require('../model/ChatModel.js');
const ApiResponse = require('../model/ApiResponse.js');
const router = require('./UserController');

router.get('/', (req,res) => {
    Chat.find()
    .then(data => {
        const response = new ApiResponse(true, data , 'Data retrived sucessfully');
        res.json(response)
    })
    .catch(err =>{
        const response = new ApiResponse(false,null,'Error: ' + err);
        res.status(500).json(response);
    })
})

router.post('/add',(req,res) => {
    const{Text, Sender, Reciver, Time} = req.body

    // check if require field is empty or not 
    if(!Text || !Sender || !Reciver || !Time){
        const response = new ApiResponse(false, null, 'Require Field is empty');
        return res.status(404).json(response);   
    }
})

// POST /api/chats
router.post('/createmessage', async (req, res) => {
    try {
      const { projectId, text, sender } = req.body;
  
      // Check if the required fields are present
      if (!projectId || !text || !sender) {
        const response = new ApiResponse(false, null, 'Missing required fields');
        return res.status(400).json(response);
      }
  
      // Create a new message
      const newMessage = {
        text,
        sender,
        time: new Date()
      };
  
      // Find or create a chat based on the projectId 
      let chat = await Chat.findOne({ projectId });
  
      if (!chat) {
        const response = new ApiResponse(false, null, 'Project Id is not valid');
        return res.status(400).json(response);
      }
  
      // Add the new message to the chat
      chat.messages.push(newMessage);
      await chat.save();
  

      const response = new ApiResponse(true, chat, 'Chat added successfully');
      res.json(response);
    } catch (error) {
      const response = new ApiResponse(false, null, 'Error: ' + err);
      res.status(400).json(response);
    }
  });

  router.post('/createproject',async(req,res) =>{} );