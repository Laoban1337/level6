// Require the express module
const express = require('express');
/*comments added to remind myself what this all does*/ 

// Create a router object using express.Router()
const userRouter = express.Router();

// Require the User and Issue models
const User = require('../models/User');
const Issue = require('../models/Issue');

// Define a GET route '/api/main/users'
userRouter.get('/api/main/users', async (req, res, next) => {
  try {
    // Use the User model to perform an aggregation query
    const usersWithIssues = await User.aggregate([
      {
        // Perform a lookup operation
        $lookup: {
          // Specify the collection to join ('issues' collection)
          from: 'issues',
          // Specify the field from the local collection ('User') to match (_id)
          localField: '_id',
          // Specify the field from the foreign collection ('Issue') to match ('user')
          foreignField: 'user',
          // Specify the field in the output documents where the array of joined documents will be stored
          as: 'issues'
        }
      }
    ]);

    // Respond with status 200 (OK) and send the result as JSON
    res.status(200).json(usersWithIssues);
  } catch (error) {
    // If an error occurs during the try block, catch it here
    console.error(error);
    // Respond with status 500 (Internal Server Error) and send an error message as JSON
    res.status(500).json({ errMsg: 'Failed to fetch all users and issues' });
  }
});

// Export the userRouter object to make it available for use in other modules
module.exports = userRouter;
