const express = require("express");
const bodyParser = require("body-parser");
const forkify = require("./webapi/Forkify");
const logger = require("./common/Logger");

const app = express();
app.use(bodyParser.json());

//carica la lista delle ricette
app.get("/recipes", async (req, res) => {
    try {
        const token = req.query.key;
        const search = req.query.search;

        const forkifyObj = new forkify.ForkifyWebApi(token);
        const forkifyResp = await forkifyObj.getAllRecipes(search);
        res.status(forkifyResp.status).json(JSON.parse(forkifyResp.json));
    } catch (e) {
        logger.Trace.error(e);
        res.status(500).json({ status: "fail", message: e.message });
    }
});

//ricerca una ricetta per chiave
app.get("/recipes/:id", async (req, res) => {
    try {
        const token = req.query.key;
        const id = req.params.id;

        const forkifyObj = new forkify.ForkifyWebApi(token);
        const forkifyResp = await forkifyObj.getRecipe(id);
        res.status(forkifyResp.status).json(JSON.parse(forkifyResp.json));
    } catch (e) {
        logger.Trace.error(e);
        res.status(500).json({ status: "fail", message: e.message });
    }
});

//carica una ricetta
app.post("/recipes", async (req, res) => {
    try {
        const token = req.query.key;

        const forkifyObj = new forkify.ForkifyWebApi(token);
        const forkifyResp = await forkifyObj.createNewRecipe(req.body);
        res.status(forkifyResp.status).json(JSON.parse(forkifyResp.json));
    } catch (e) {
        logger.Trace.error(e);
        res.status(500).json({ status: "fail", message: e.message });
    }
});

app.listen(8000);
