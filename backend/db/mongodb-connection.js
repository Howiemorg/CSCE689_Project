import dotenv from 'dotenv'
import mongoose from 'mongoose';
dotenv.config()

const mongoString = process.env.MONGODB_URL;

async function getMongoDB() {
  mongoose.connect(mongoString, {maxPoolSize: 100, dbName: "LLMEducate"});
  let conn = mongoose.connection;

  conn.on("error", (error) => {
    console.log(error);
  });


  conn.once("connected", () => {
    console.log("Database Connected");
  });

  return conn
}

export default getMongoDB;