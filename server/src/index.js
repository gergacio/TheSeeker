import express from "express"; //framework create our api
import cors from "cors" // set up rules for comunications (between diff domains)
import mongoose from "mongoose" // mongodb orm (alow us to write queries in easy way)
import * as dotenv from 'dotenv';
import { userRouter } from './routes/users.js';
import { teachersRouter } from './routes/teachers.js';

const PORT = process.env.PORT || 8081;


const app = express(); //genarate a virsion of our api

//apply middleware usifulinside our app
app.use(express.json()); //turn data in json
app.use(cors()); //
dotenv.config();
//apply routers - devide endpoints in given way


// mongodb - Atlas (cloud service) - create db and deploy them


//server

app.listen(PORT, () => {
  mongoose.connect(`mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASS}@the-seeker-db.j5w682j.mongodb.net/the-seeker-db?retryWrites=true&w=majority`,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully to mongodb");
});
app.use("/auth", userRouter);
app.use("/teachers", teachersRouter);



  console.log("server is successfully running on ", PORT);
});




