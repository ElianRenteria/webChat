const data = require('./keys.json');

const express = require("express");
const cors = require("cors");
const axios = require("axios");

const privateKey = data.PrivateKey;
const projectID = data.ProjectID;

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    try {
        const r = await axios.put(
            'https://api.chatengine.io/users/',
            { username: username, secret: username, first_name: username },
            { headers: { "Private-Key": privateKey }}
        );
        return res.status(r.status).json(r.data);
    } catch (e) {
        return res.status(e.response ? e.response.status : 500).json(e.response ? e.response.data : { error: "Internal Server Error" });
    }
});

app.listen(9000, () => {
    console.log('Server is running on port 9000');
});
