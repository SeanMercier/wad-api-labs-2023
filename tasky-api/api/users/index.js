import express from 'express';
import User from './userModel';
import asyncHandler from 'express-async-handler';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
}));

// register(Create)/Authenticate User
router.post('/', asyncHandler(async (req, res) => {
  if (req.query.action === 'register') {
    const user = new User(req.body);

    try {
      // Attempt to save the user to the database
      await user.save();
      res.status(201).json({
        code: 201,
        msg: 'Successfully created a new user.',
      });
    } catch (error) {
      // Handle Mongoose validation error
      if (error.name === 'ValidationError') {
        const errors = Object.values(error.errors).map((err) => err.message);
        return res.status(400).json({ code: 400, msg: 'Validation error', errors });
      }
      // Handle other errors
      console.error('User registration error:', error);
      res.status(500).json({ code: 500, msg: 'Internal Server Error' });
    }
  } else {
    const user = await User.findOne(req.body);
    if (!user) {
      return res.status(401).json({ code: 401, msg: 'Authentication failed' });
    } else {
      return res.status(200).json({ code: 200, msg: 'Authentication Successful', token: 'TEMPORARY_TOKEN' });
    }
  }
}));

// Update a user
router.put('/:id', asyncHandler(async (req, res) => {
  if (req.body._id) delete req.body._id;
  const result = await User.updateOne({
    _id: req.params.id,
  }, req.body);
  if (result.matchedCount) {
    res.status(200).json({ code: 200, msg: 'User Updated Successfully' });
  } else {
    res.status(404).json({ code: 404, msg: 'Unable to Update User' });
  }
}));

export default router;