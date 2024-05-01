const express = require("express");
const errorHandler = require("../Middleware/errorHandler");
const token = require("../Middleware/validateToken");
const upload = require("../Middleware/upload");

const { registerUser, loginUser } = require("../Controller/userController");

const {
  addEmployee,
  getAllEmployee,
  deleteEmployee,
  fetchSingleEmployee,
  updateEmployee,
  searchEmployee,
} = require("../Controller/EmployeeController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/addEmployee", token, upload.single("image"), addEmployee);

router.get("/allEmployee", token, getAllEmployee);

router.delete("/deleteEmployee/:_id", token, deleteEmployee);

router.get("/fetchSingleEmployee/:_id", token, fetchSingleEmployee);

router.put("/updateEmployee/:_id", token, updateEmployee);

router.get("/search/:key", token, searchEmployee);

router.use(errorHandler);

module.exports = router;
