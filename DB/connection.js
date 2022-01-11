const mongoose = require('mongoose');

//------------------------------------------
//connect to remote server
//9/1/21
//https://cloud.mongodb.com/v2/612fc341429b0d03fe1aa2d2#clusters/detail/Cluster0/connect?clusterId=Cluster0
//old connection
//const URI = "mongodb+srv://trobert612t:trobert612t@cluster0.bhab8.mongodb.net/confusion?retryWrites=true&w=majority";
const URI =  "mongodb+srv://dbUser:dbUser@cluster0.g6clw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
//const URI = "mongodb+srv://trobert612t:trobert612t@cluster0.dzu8b.mongodb.net/confusion?retryWrites=true&w=majority";
console.log("Before database connection");

const connectDB = async() =>{
    console.log("await database connection");
    await mongoose.connect(URI, { useNewUrlParser: true ,  useUnifiedTopology: true });
    console.log('DB connected - 16');
  }
  /*
  const { MongoClient } = require('mongodb');
  //"mongodb+srv://trobert612t:aANJmGQ9bKqDL94@cluster0.bhab8.mongodb.net/confusion?retryWrites=true&w=majority";
  const uri = "mongodb+srv://trobert612t:aANJmGQ9bKqDL94@cluster0.bhab8.mongodb.net/confusion?retryWrites=true&w=majority";
  const connect = mongoose.connect(uri);
  
  
  console.log("uri -> " + uri);
  const { MongoClient } = require('mongodb');
  const uri = "mongodb+srv://dbUser:dbUser@cluster0.dzu8b.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
  });
  */
  

module.exports = connectDB;