const express = require('express');
const router = express.Router();
const Team = require('../models/Team');
const User = require('../models/User');

// POST /api/team
router.post('/x', async (req, res) => {
    const { name, memberIds } = req.body;

    try {
        // Ensure unique domains and availability
        const members = await User.find({ _id: { $in: memberIds }, available: true });
        const uniqueDomains = new Set(members.map(member => member.domain));

        if (uniqueDomains.size !== members.length) {
            return res.status(400).json({ message: 'Team members must have unique domains and be available.' });
        }

        const team = new Team({ name, members: members.map(member => member._id) });
        const newTeam = await team.save();
        res.status(201).json(newTeam);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const { userIds } = req.body; // Expect an array of user IDs
  
    try {
      // Fetch users by IDs
      const users = await User.find({ _id: { $in: userIds } });
  
      // Check for unique domains and availability
      const uniqueDomains = new Set();
      for (const user of users) {
        if (!user.available || uniqueDomains.has(user.domain)) {
          return res.status(400).json({ message: "All users must be available and have unique domains." });
        }
        uniqueDomains.add(user.domain);
      }
  
      // Create and save the team
      const team = new Team({ users: userIds });
      await team.save();
  
      res.status(201).json(team);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

// GET /api/team/:id
router.get('/:id', async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members');
        if (team) {
            res.json(team);
        } else {
            res.status(404).json({ message: 'Team not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
