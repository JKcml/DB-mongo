require("dotenv").config();
const{MongoClient} = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function connect() {
    try {
        await client.connect();
        const db = client.db("m43mongo");
        return db.collection("movie");
    } catch (error) {
        console.log(error);
    } 
}

module.exports = {client, connect};
