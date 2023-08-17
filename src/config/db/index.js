const { MongoClient, ServerApiVersion } = require('mongodb');
const account = require('./mongoinfo.json');
const uri = `mongodb+srv://${account.username}:${account.password}@cluster01.chrqhpv.mongodb.net/?retryWrites=true&w=majority`;
const mongoose = require('mongoose');
async function run() {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("[MONGODB] Connected successfully !");
    } catch (err) {
        console.log("[MONGODB] Connect failed");
    }
}

module.exports = { connect: run }
