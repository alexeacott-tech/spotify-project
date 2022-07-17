const express = require("express");
const request = require("request");
const querystring = require('node:querystring');

const app = express();

app.listen(3000, function() {
    console.log("Node listening on port 3000");
});

//Listen for get request on root url. eg. http://localhost:3000
app.get('/login', function (req, res) {
    const state = "123456789";
    const scope = "user-read-private user-read-email";
    const redirect_uri = "http://localhost:3000/callback"
    res.redirect("https://accounts.spotify.com/authorize?" +
        querystring.stringify({
            response_type: "code",
            client_id: "b184664583354febb800d48a0b7528d2",
            scope: scope,
            redirect_uri: redirect_uri,
            state: state
        })    
    );
});

app.get('/callback', function(req, res) {
    const code = req.query.code || null;
    const state = req.query.state || null;
    if (state == null) {
        res.redirect("/#" + querystring.stringify({error: "state_mismatch"}));
    } else {
        const authOptions = {
            url: "https://accounts.spotify.com/api/token",
            form: {
                code: code,
                redirect_uri: "http://localhost:3000/callback",
                grant_type: "authorization_code"
            },
            headers: {
                "Authorization": "Basic" + (Buffer.from("b184664583354febb800d48a0b7528d2" + ":" + "6f809a5c250643d189cc4acd3154d156").toString("base64"))
            },
            json: true,
        }
        // request.post(authOptions, function(error, response, body) {
        //     console.log(body)
        // })
    }
})

app.set("view engine", "ejs")