const express = require('express');
const router = express.Router();
const members = require('../../members');

// A simple REST API
router.get('/', (req, res) => {
    res.json(members);
});

// Single Member Request
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.send(req.params.id);
    } else {
        res.status(400).json({ msg: `Member with id of ${req.params.id} not found :|` });
    }
});

module.exports = router