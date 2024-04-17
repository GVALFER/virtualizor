const axios = require("axios");
const https = require("https");

const credentials = {
    HOST: "192.168.1.100",
    KEY: "JGSLKsXVWlwcGBh7inFLgVr9lO3hfP50uX",
    PASS: "kAIxf2eNE1OpkCOaMdsEbMiiLWaqFdKKTP",
    PORT: "4085",
    VPSID: 14,
    OSID: 1081,
    NEWPASS: "123456",
    CONF: "123456",
};

const makeHttpRequest = async ({ path, method = "GET", data = {} }) => {
    const { HOST, KEY, PASS, PORT } = credentials;

    const url = `https://${HOST}:${PORT}/index.php?${path}&adminapikey=${KEY}&adminapipass=${PASS}&api=json`;

    const agent = new https.Agent({ rejectUnauthorized: false, requestCert: false });

    try {
        const response = await axios({
            method,
            url,
            data: method === "POST" ? data : undefined,
            params: method === "GET" ? data : undefined,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            httpsAgent: agent,
        });

        if (response.status !== 200) {
            return {
                success: false,
                message: `HTTP error ${response.status}: ${response.statusText}`,
            };
        }

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        console.log(error);
    }
};

// Example function to list all VPS
const fetcher = ({ path, data }) => {
    return makeHttpRequest({
        path: path,
        method: "GET",
        data,
    });
};

module.exports = {
    fetcher,
    credentials,
};
