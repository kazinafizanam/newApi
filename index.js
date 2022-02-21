const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");

//include required modules
const jwt = require("jsonwebtoken");
const config = require("./config");
const rp = require("request-promise");

const app = express();
const port = 3666;

app.use(cors());
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
    })
);

app.get("/", (request, response) => {
    response.json({ info: "Node.js, Express and Zoom API" });
});
//zoom

var email;

//creating the token for auth
const payload = {
    iss: config.APIKey,
    exp: new Date().getTime() + 5000,
};

const token = jwt.sign(payload, config.APISecret);

app.post("/meeting", (req, res) => {
    email = req.body.email;
    var options = {
        method: "POST",
        uri: "https://api.zoom.us/v2/users/" + email + "/meetings",
        body: {
            topic: "Meeting",
            type: 1,
            settings: {
                host_video: "true",
                participant_video: "true",
            },
        },
        auth: {
            bearer: token,
        },
        headers: {
            "User-Agent": "Zoom-api-Jwt-Request",
            "content-type": "application/json",
        },
        json: true,
    };

    rp(options)
        .then(function (response) {
            console.log("response is: ", response.join_url);
            // response.status(200).json(response);
            let dataRes = {
                join_url: response.join_url,
            };
            res.status(200).json(dataRes);

            // res.send("create meeting result: " + JSON.stringify(response));
        })
        .catch(function (err) {
            // API call failed...
            console.log("API call failed, reason ", err);
        });
});

app.listen(port, () => {
    console.log(`App running on port ${port}.`);
});
