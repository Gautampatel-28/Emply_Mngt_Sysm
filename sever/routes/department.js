import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addDepartment, getDepartments, editDepartment, updateDepartment, deleteDepartment } from "../controller/departmentController.js";

const router = express.Router();

router.get("/", authMiddleware, getDepartments);
router.post("/add", authMiddleware, addDepartment);
router.get("/:id", authMiddleware, editDepartment);
router.put("/:id", authMiddleware, updateDepartment);
router.delete("/:id", authMiddleware, deleteDepartment);


export default router;
