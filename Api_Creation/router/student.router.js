const { Router } = require("express");
const router = Router();
const studentmodel = require("../models/student.models");

router.get("/", async (req, res) => {
  try {
    const students = await studentmodel.find();
    res.json(students);
  } catch (error) {
    res.status(400).json({message:error.message});
  }
});

router.post("/", async (req, res) => {
  try {
    const addstudent = await studentmodel.create(req.body);
    res.status(201).json(addstudent);
  } catch (error) {
    res.status(400).json({message:error.message});
  }
});

router.get("/:id", async (req, res) => {
  try {
    const student = await studentmodel.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not Found" });
    res.json(student);
  } catch (error) {
    res.status(400).json({message:error.message});
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatestudent = await studentmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatestudent)
      return res.status(404).json({ message: "Student not found" });
    res.json(updatestudent);
  } catch (error) {
    res.status(400).json({message:error.message});
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const student = await studentmodel.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student Deleted" });
  } catch (error) {
    res.status(400).json({message:error.message});
  }
});

module.exports = router;
