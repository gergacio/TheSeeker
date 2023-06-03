import express from "express";
import mongoose from "mongoose";
import { TeachersModel } from "../models/Teachers.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./users.js";

const router = express.Router();

//return all teachers inside db
router.get("/", async (req, res) => {
  try {
    const result = await TeachersModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new place
router.post("/", verifyToken, async (req, res) => {
  const teacher = new TeachersModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    location: req.body.location,
    continent: req.body.continent,
    religion: req.body.religion,
    bio: req.body.bio,
    selfIdentity: req.body.selfIdentity,

    quotes: req.body.quotes,
    teacherImg: req.body.teacherImg,
    locationImg: req.body.locationImg,
    whatToVisit: req.body.whatToVisit,
    userOwner: req.body.userOwner,
  });
  console.log(teacher);

  try {
    const result = await teacher.save();
    res.status(201).json({
      createdTeacher: {
        name: result.name,
        location: result.location,
        continent: result.continent,
        religion: result.religion,
        bio: result.bio,
        selfIdentity: result.selfIdentity,

        quotes: result.quotes,
        teacherImg: result.teacherImg,
        locationImg: result.locationImg,
        whatToVisit: result.whatToVisit,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Get a teacher by ID
router.get("/:teacherId", async (req, res) => {
  try {
    const result = await TeachersModel.findById(req.params.teacherId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a Teacher
router.put("/", verifyToken,async (req, res) => {
  const teacher = await TeachersModel.findById(req.body.teacherID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedTeachers.push(teacher);
    await user.save();
    res.status(201).json({ savedTeachers: user.savedTeachers });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved teachers
router.get("/savedTeachers/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedTeachers: user?.savedTeachers });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved teacher
router.get("/savedTeachers/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedTeachers = await TeachersModel.find({
      _id: { $in: user.savedTeachers },
    });

    console.log(savedTeachers);
    res.status(201).json({ savedTeachers });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as teachersRouter };