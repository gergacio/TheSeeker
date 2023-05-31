import express from "express"; //framework create our api
import cors from "cors" // set up rules for comunications (between diff domains)
import mongoose from "mongoose" // mongodb orm (alow us to write queries in easy way)

const app = express(); //genarate a virsion of our api

//apply middleware usifulinside our app
app.use(express.json()); //turn data in json
app.use(cors()); //

app.listen(3001, () => console.log("Server Started!"));

