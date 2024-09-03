const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users with pagination, filtering, and search
router.get('/x', async (req, res) => {
    const { page = 1, limit = 20, search = '', domain, gender, available } = req.query;

    const filter = {
        ...(domain && { domain }),
        ...(gender && { gender }),
        ...(available && { available: available === 'true' }),
        ...(search && { first_name: new RegExp(search, 'i') })
    };

    try {
        const users = await User.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit);
        const count = await User.countDocuments(filter);

        res.json({
            users,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    const { page = 1, limit = 20, domain, gender, available, search } = req.query;
    const query = {};
  
    if (domain) {
      query.domain = domain;
    }
    if (gender) {
      query.gender = gender;
    }
    if (available !== undefined) {
      query.available = available === 'true';
    }
    if (search) {
      // Search by name (first_name or last_name)
      query.$or = [
        { first_name: new RegExp(search, 'i') }, // Case-insensitive search
        { last_name: new RegExp(search, 'i') },
      ];
    }
  
    try {
      const users = await User.find(query)
        .skip((page - 1) * limit)
        .limit(Number(limit))
        .exec();
  
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// GET /api/users/:id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/users
router.post('/', async (req, res) => {
    const user = new User(req.body);
    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/users/:id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
