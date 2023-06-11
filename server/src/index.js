import express from "express"; //framework create our api
import cors from "cors" // set up rules for comunications (between diff domains)
import mongoose from "mongoose" // mongodb orm (alow us to write queries in easy way)
import * as dotenv from 'dotenv';
import { userRouter } from './routes/users.js'
import { teachersRouter } from './routes/teachers.js'


const app = express(); //genarate a virsion of our api

//apply middleware usifulinside our app
app.use(express.json()); //turn data in json
app.use(cors()); //
dotenv.config();
//apply routers - devide endpoints in given way
app.use("/auth", userRouter);
app.use("/teachers", teachersRouter);

//mongodb - Atlas (cloud service) - create db and deploy them



  try {
    await mongoose.connect(`mongodb+srv://ggeorgeuk:${process.env.ATLAS_PASS}@the-seeker-db.j5w682j.mongodb.net/the-seeker-db?retryWrites=true&w=majority`,  {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (error) {
    handleError(error);
  }



//server

app.listen(3002, () => console.log(`Server running at 3002`));




