const express = require("express");
const server = express();

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// routes
const rebuild = require("./routes/rebuild");
const status = require("./routes/get-vm-status");

server.use("/rebuild", rebuild);
server.use("/get-vm-status", status);

// Catch-all for undefined routes
server.use((req, res) => {
    res.status(404).json({ error: "Not Found" });
});

server.listen(4100, () => {
    console.log(`Server listening on port 4100`);
});
