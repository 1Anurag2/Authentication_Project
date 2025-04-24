const { Router } = require("express");
const router = Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const studentmodel = require("../models/student_models");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed!"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 3,
  },
});

router.get("/", async (req, res) => {
  try {
    const students = await studentmodel.find();
    res.json(students);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Add new Student
router.post("/", upload.single("profile_pic"), async (req, res) => {
  try {
    // const addstudent = await studentmodel.create(req.body);
    const student = new studentmodel(req.body);
    if (req.file) {
      student.profile_pic = req.file.filename;
    }
    const addstudent = await student.save();
    res.status(201).json(addstudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await studentmodel.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not Found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.put("/:id", upload.single("profile_pic"), async (req, res) => {
  try {
    const existingStudent = await studentmodel.findById(req.params.id);
    if (!existingStudent) {
      if (req.file.filename) {
        const filepath = path.join("./uploads", req.file.filename);
        fs.unlink(filepath, (err) => {
          if (err) console.log("Failed to Delete  image: ", err);
        });
      }
      return res.status(404).json({ message: "Student not found" });
    }

    if (req.file) {
      if (existingStudent.profile_pic) {
        const oldimagepath = path.join(
          "./uploads",
          existingStudent.profile_pic
        );
        fs.unlink(oldimagepath, (err) => {
          if (err) console.log("Failed to Delete old image: ", err);
        });
      }
      req.body.profile_pic = req.file.filename;
    }
    const updatestudent = await studentmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatestudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await studentmodel.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    if (student.profile_pic) {
      const filePath = path.join("./uploads", student.profile_pic);
      fs.unlink(filePath, (err) => {
        if (err) console.log("Failed to Delete : ", err);
      });
    }
    res.json({ message: "Student Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
