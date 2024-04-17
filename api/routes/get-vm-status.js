const express = require("express");
const router = express.Router();
const { fetcher, credentials } = require("./helper");

router.get("/", async (req, res) => {
    const { VPSID } = credentials;

    const vmStatus = await fetcher({
        method: "GET",
        path: `act=vs&vs_status=${VPSID}`,
    });
    return res.json({
        vmStatus,
    });
});

module.exports = router;
