const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mydatabase")
  .then(() => console.log("Connected"))
  .catch(err => console.log(err));

const studentSchema = new mongoose.Schema({
  name: String,
  roll: Number,
  course: String,
  marks: Number
});

const Student = mongoose.model("Student", studentSchema);

// Search student by name or roll or marks
async function search() {
  // Example: find students with marks greater than 80
  const result = await Student.find({ marks: { $gt: 80 } });

  console.log("Search result:");
  console.log(result);
}

search();
