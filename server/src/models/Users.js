import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required:true, unique: true},
    password: {type: String, required: true},
    savedteachers: [{type: mongoose.Schema.Types.ObjectId, ref: "teachers"}], //many to many
});

export const UserModel = mongoose.model("users", UserSchema);


//database called the-seeker-db with collections users and teachers
//model for our collection called users will be created base on schema provided