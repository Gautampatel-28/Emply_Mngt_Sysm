import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addEmployee, upload, getEmployees, getEmployee, updateEmployee } from "../controller/employeeController.js";


const router = express.Router();

router.get("/", authMiddleware, getEmployees);
router.post("/add", authMiddleware, upload.single("profileImage"), addEmployee);
router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, updateEmployee);
// router.delete("/:id", authMiddleware, deleteDepartment);

export default router;
