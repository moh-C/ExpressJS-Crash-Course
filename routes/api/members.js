const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require('../../members');

// A simple REST API
router.get('/', (req, res) => {
    res.json(members);
});

// Single Member Request
router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if (found) {
        res.send(members.filter(member => member.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({ msg: `Member with id of ${req.params.id} not found :|` });
    }
});

// Create Member
router.post('/', (req, res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        status: req.body.status
    }

    if (!newMember.name || !newMember.status) {
        return res.status(400).json({ msg: "Seriously bro, what the fuck? Include name and/or status :|" });
    }

    members.push(newMember);
    res.json(members);

});

// Updating the members
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));

    if (found) {
        const updMember = req.body;

        members.forEach(member => {
            if (member.id === parseInt(req.params.id)) {
                member.name = updMember.name ? updMember.name : member.name;
                member.status = updMember.status ? updMember.status : member.status;
                res.json({ msg: 'Member Updated!', member });
            }
        })

    } else {
        res.status(400).json({ msg: `Member with id of ${req.params.id} not found :|` });
    }
});

module.exports = router