import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  // quotes: {
  //   type: String,
  //   required: true,
  // },

  image: {
    type: String,
    required: true,
  },
  placeimg: {
    type: String,
    required: true,
  },

  userOwner: { //keep truck user who create teacher
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

export const TeachersModel = mongoose.model("teachers", teacherSchema);