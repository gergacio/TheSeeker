import mongoose from "mongoose";

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  continent: {
    type: String,
    required: true,
  },
  religion: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  selfIdentity: {
    type: String,
    required: true,
  },
  quotes: [
    {
      type: String,
      required: true,
    },
  ],

  teacherImg: {
    type: String,
    required: true,
  },
  locationImg: {
    type: String,
    required: true,
  },
  whatToVisit: {
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