const express = require('express');
const app = express();

const uri = "mongodb+srv://abc:<password>@cluster0.00cnals.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
constclient = new MongoClient(uri);

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.listen(8080, () => {
    console.log("server listening on port 8080");
})