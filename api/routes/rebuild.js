const express = require("express");
const router = express.Router();
const { fetcher, credentials } = require("./helper");

router.get("/", async (req, res) => {
    const { VPSID, OSID, NEWPASS, CONF } = credentials;

    const sendAction = await fetcher({
        method: "POST",
        path: `act=rebuild&vpsid=${VPSID}&osid=${OSID}&newpass=${NEWPASS}&conf=${CONF}`,
    });

    return res.json({
        sendAction,
    });
});

module.exports = router;
