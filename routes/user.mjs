import express from 'express';
import User from '../models/users.mjs';
import authenticateToken from '../middleware/auth.mjs';
import pralayUser from '../models/users.mjs';
import jwt from 'jsonwebtoken';
import AsyncStorage from '@react-native-async-storage/async-storage';

const router = express.Router();

// Secret key for signing JWT tokens
const JWT_SECRET = 'helloworld';

router.get('/details', authenticateToken, async (req, res) => {
    console.log('inside details route');
    const authorizationHeader = req.headers.authorization;
  
    if (!authorizationHeader) {
      return res.status(401).json({ message: 'Access denied - Authorization header missing' });
    }

    const token = req.headers.authorization.split(' ')[1];
    console.log('Received Token:', token);

    // The user information is now available in req.user
    const userId = req.user.userId;
    console.log('User ID:', userId);
  
    try {
      // Fetch user details based on the user ID
      const user = await User.findById(userId);
  
      if (user) {
        // Send user details as the response
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            mobileNo: user.mobileNo,
            emailId: user.emailId,
            password: user.password,
        });
      } 
      
      else {
        res.status(404).json({ error: 'User not found' });
      }

    } 
    
    catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }

  });



  router.post('/register', async (req, res) => {
    try {
      console.log('inside register route');
      const { firstName, lastName, gender, assister, mobileNo, emailId, password } = req.body;
  
      // Validate the request body here if needed
  
      // Create a new user
      console.log('creating new user');
      const newUser = new User({
        firstName,
        lastName,
        gender,
        assister,
        mobileNo,
        emailId,
        password,
      });

      console.log('saving info in db');
      // Save the user to the database
      await newUser.save();
      console.log('saved info in db');

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




  router.post('/login', async (req, res) => {
    const { mobileNo, emailId, password } = req.body;
   try {
    console.log('inside login route');
    const user = await pralayUser.findOne({ mobileNo, emailId, password });

    if (user) {

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        console.log('Token generated:', token);

      req.session.user = {
        userId: user._id, 
        firstName: user.firstName,
        lastName: user.lastName,
        mobileNo: user.mobileNo,
        emailId: user.emailId,
        password: user.password,
      };

      res.status(200).json({ 
        message: 'User logged in successfully',
        user: { userId: user._id, firstName: user.firstName, lastName: user.lastName, mobileNo: user.mobileNo, emailId: user.emailId, password: user.password },
        token,
    });
    } else {
      res.status(401).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

  
  router.get('/profile', authenticateToken, async (req, res) => {
    try {
      // Check if the user is logged in by checking the session
      if (!req.session.user) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch user information from the database using the stored user ID
    const userId = req.session.user.userId;
    const user = await pralayUser.findById(userId);

    if (user) {
      // Send user details as the response
      res.status(200).json({
        firstName: user.firstName,
        lastName: user.lastName,
        // Add more user information as needed
      });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


  
  export default router;