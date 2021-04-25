const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.get("/login", (req, res) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        res.status(400).json({ status: "fail", message: "Header di autorizzazione non impostato" });
    }

    const tokens = authorization.split(" ");

    if (tokens.length != 2) {
        res.status(400).json({ status: "fail", message: "Header di autorizzazione non impostato correttamente: " + authorization });
    }

    const authToken = tokens[1];

    if (authToken === "05a97d2a-f36d-4b7b-91d9-801cd3c0e963") {
        res.status(200).json({ status: "success", message: "" });
    } else {
        res.status(401).json({ status: "fail", message: "Non sei autorizzato con il token: " + authToken });
    }
});

app.listen(8080);
