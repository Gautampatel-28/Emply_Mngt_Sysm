import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addDepartment, getDepartments, editDepartment, updateDepartment } from "../controller/departmentController.js";

const router = express.Router();

router.get("/", authMiddleware, getDepartments);
router.post("/add", authMiddleware, addDepartment);
router.get("/:id", authMiddleware, editDepartment);
router.put("/:id", authMiddleware, updateDepartment);


export default router;
