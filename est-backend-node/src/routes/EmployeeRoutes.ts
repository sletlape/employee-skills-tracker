import express from "express";
import { getAllEmployees, createEmployee, deleteEmployee, updateEmployee } from "../controllers/EmployeeController";

const router = express.Router();

router.get('/employees/', getAllEmployees);
router.post('/employees/', createEmployee);
router.delete('/employees/:id', deleteEmployee);
router.put('/employees/:id', updateEmployee);

export default router;