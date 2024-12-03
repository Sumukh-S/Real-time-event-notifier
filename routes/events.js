const express = require('express');
const router = express.Router();
const events = [];

router.post('/', (req, res) => {
    const { title, description, time } = req.body;
    if (!title || !description || !time) {
        return res.status(400).json({ error: 'Invalid event data' });
    }

    const eventTime = new Date(time);
    if (isNaN(eventTime)) {
        return res.status(400).json({ error: 'Invalid time format' });
    }

    const overlap = events.some((e) => 
        Math.abs(new Date(e.time) - eventTime) < 300000
    );

    events.push({ title, description, time: eventTime, overlap });
    events.sort((a, b) => new Date(a.time) - new Date(b.time));
    res.status(201).json({ message: 'Event added successfully', overlap });
});

router.get('/', (req, res) => {
    const upcomingEvents = events.filter((e) => new Date(e.time) > new Date());
    res.json(upcomingEvents);
});

module.exports = router;
module.exports.events = events;