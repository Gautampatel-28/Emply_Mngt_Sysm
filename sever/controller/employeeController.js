import multer from "multer";
import path from "path";
import Employee from "../models/Employee.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import department from "../models/department.js";

// Storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      martialStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    // check user already exists
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ success: false, error: "User already registered!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // save user with image
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? `/public/uploads/${req.file.filename}` : "",

    });

    const savedUser = await newUser.save();

    // save employee
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      martialStatus,
      designation,
      department,
      password,
      // profileImage,
      salary,
    });

    await newEmployee.save();

    return res
      .status(200)
      .json({ success: true, message: "Employee Created Successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Server error in adding employee" });
  }
};

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const getEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employees = await Employee.findById({ _id: id })
      .populate("userId", { password: 0 })
      .populate("department");
    return res.status(200).json({ success: true, employees });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "get employees server error" });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, martialStatus, designation, department, salary } = req.body;

    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      return res
        .status(404)
        .json({ success: false, error: "employee not found" });
    }

    const user = await User.findById({ _id: employee.userId });
    if (!user) {
      return res.status(404).json({ success: false, error: "user not found" });
    }

    const updateUser = await User.findByIdAndUpdate(
      { _id: employee.userId },
      { name }
    );
    const updateEmployee = await Employee.findByIdAndUpdate(
      { _id: id },
      {
        martialStatus,
        designation,
        salary,
        department,
      }
    );

    if (!updateEmployee || !updateUser) {
      return res.status(404).json({ success: false, error: "document not found" });
    }
    return res
      .status(200)
      .json({ success: true, update: "Employees Updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "update employees server error" });
  }
};

export { addEmployee, getEmployees, upload, getEmployee, updateEmployee };
