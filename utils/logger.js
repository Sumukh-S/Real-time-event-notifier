const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../completed_events.log');

const logEvent = (event) => {
    const logEntry = `${new Date().toISOString()} - Event Completed: ${JSON.stringify(event)}\n`;
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error('Error writing to log file:', err);
    });
};

module.exports = { logEvent };