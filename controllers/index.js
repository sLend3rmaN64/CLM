const { MongoClient } = require("mongodb");
const urldb = "mongodb://localhost:27017/clm_dev";

const client = new MongoClient(urldb, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
    if (err) {
        console.log(err);
        process.exit(-1);
    }
    console.log("Conectado a Base de Datos");
});

module.exports = client;