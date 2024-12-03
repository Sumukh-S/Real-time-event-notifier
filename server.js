// Main server file
const express = require('express');
const http = require('http');
const { setupWebSocket } = require('./utils/websocket');
const eventRoutes = require('./routes/events');
const { setupScheduler } = require('./utils/notifier');

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use('/events', eventRoutes);

setupWebSocket(server);
setupScheduler();

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});