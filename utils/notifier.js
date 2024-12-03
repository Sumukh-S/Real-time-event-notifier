const cron = require('node-cron');
const { broadcast } = require('./websocket');
const { logEvent } = require('./logger');
const { events } = require('../routes/events');

const setupScheduler = () => {
    cron.schedule('* * * * *', () => {
        const now = new Date();
        events.forEach((event, index) => {
            const eventTime = new Date(event.time);

            if (eventTime - now <= 5 * 60 * 1000 && eventTime > now) {
                broadcast({ message: `Event "${event.title}" starts in 5 minutes!`, event });
            }

            if (eventTime <= now) {
                logEvent(event);
                events.splice(index, 1);
            }
        });
    });
};

module.exports = { setupScheduler };