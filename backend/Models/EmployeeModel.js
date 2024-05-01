const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
  {
    employeeName: {
      type: String,
      required: [true, "Please enter Domain name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: [true, "Email address already exist"],
    },
    mobile:{
      type:Number,
      required: [true, "Please enter your Mobile Number"],
    },
    Designation: {
      type: String,
      enum: ["Hr", "Manager", "Sales"],
      required: [true, "Please enter your Designation"],
    },
    Gender: {
      type: String,
      enum: ["Male", "Female"],
      required: [true, "Please enter your Gender"],
    },
    Course: {
      type: [String],
      enum: ["MCA", "BCA", "BSC"],
      required: [true, "Please enter your Course"],
    },
    image:{
      type: String,
      required: [true, "Please upload a profile image"],
    }
  },
  {
    timestamps: true,
    strict: true,
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
