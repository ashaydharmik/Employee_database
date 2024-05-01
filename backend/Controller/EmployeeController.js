const asyncHandler = require("../Middleware/asyncHandler");
const User = require("../Models/userModel");

const Employee = require("../Models/EmployeeModel");

const addEmployee = asyncHandler(async (req, res) => {
  const { employeeName, email, mobile, Designation, Gender, Course } = req.body;

  const image = req.file?.path;

  if (
    !employeeName ||
    !email ||
    !mobile ||
    !Designation ||
    !Gender ||
    !Course ||
    !image
  ) {
    res.status(400).json({ message: "Please enter all the fields" });
    return;
  }

  const availableEmployee = await Employee.findOne({ email });

  if (availableEmployee) {
    res.status(400).json({ message: "Employee already exists!!" });
    return;
  }

  const newEmployee = await Employee.create({
    employeeName,
    email,
    mobile,
    Designation,
    Gender,
    Course,
    image,
  });

  console.log(newEmployee);

  if (newEmployee) {
    res.status(200).json({
      message: "Employee successfully created",
      employeeName,
      email,
      mobile,
      Designation,
      Gender,
      Course,
      image,
    });
  } else {
    res.status(400).json({ message: "Invalid data" });
  }
});

const getAllEmployee = asyncHandler(async (req, res) => {
  const employees = await Employee.find();
  const totalEmployees = await Employee.countDocuments();

  if (employees) {
    res.status(200).json({
      message: "Employees fetched successfully",
      totalEmployees,
      employees,
    });
  } else {
    res.status(400).json({ message: "Employees not found" });
  }
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const { _id } = req.params;

  if (!_id) {
    res
      .status(400)
      .json({ error: "Invalid request. Missing created Employee ID." });
    return;
  }

  const deleteEmployee = await Employee.findByIdAndDelete(_id);

  if (!deleteEmployee) {
    res.status(404).json({ error: "Created Employee not found." });
  } else {
    res.status(200).json({
      message: "Employee Successfully Deleted!!",
      domainEmployee: deleteEmployee.employeeName,
    });
  }
});

const fetchSingleEmployee = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const availableEmployee = await Employee.findOne({ _id });

  if (!availableEmployee) {
    res.status(404).json({ error: "Employee not found" });
  } else {
    res.status(200).json({ message: "Employee Found", availableEmployee });
  }
});

const updateEmployee = asyncHandler(async (req, res) => {
  const { employeeName, email, mobile, Designation, Gender, Course, image } =
    req.body;
  const { _id } = req.params;

  const availableEmployee = await Employee.findOne({ _id });
  if (!availableEmployee) {
    res.status(400);
    throw new Error("Employee not exists");
  }

  const update = await Employee.findByIdAndUpdate(
    _id,
    {
      employeeName,
      email,
      mobile,
      Designation,
      Gender,
      Course,
      image,
    },
    { new: true }
  );
  if (update) {
    res
      .status(200)
      .json({
        message: "Employee Updated Successfully",
        updatedEmployee: update,
      });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

const searchEmployee = asyncHandler(async (req, res) => {
  const employees = await Employee.find({
    employeeName: { $regex: req.params.key, $options: "i" },
  });

  if (employees.length > 0) {
    res.status(200).json({ employees });
  } else {
    res.status(404).json({ message: "Employee not found" });
  }
});

module.exports = {
  addEmployee,
  getAllEmployee,
  updateEmployee,
  fetchSingleEmployee,
  deleteEmployee,
  searchEmployee,
};
