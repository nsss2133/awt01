const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

// Student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  roll: Number,
  course: String,
  marks: Number
});

const Student = mongoose.model("Student", studentSchema);

// Insert a student
async function addStudent() {
  const s = await Student.create({
    name: "Neha",
    roll: 101,
    course: "BCA",
    marks: 88
  });

  console.log("Student added:", s);
}

addStudent();
