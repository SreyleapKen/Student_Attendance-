const mongoose = require('mongoose');
const uri = "mongodb+srv://kensreyleap7_db_user:Sreyleap0311@cluster0.cfvsqmu.mongodb.net/?appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  await mongoose.connect(uri, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
}

run().catch(console.dir);

module.exports = mongoose;