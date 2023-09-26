import express from "express";
import { getEmployees, createEmployee, deleteEmployee, updateEmployee } from "../controllers/EmployeeController";

const router = express.Router();

router.get('/employees/', getEmployees);
router.post('/employees/', createEmployee);
router.delete('/employees/:id', deleteEmployee);
router.put('/employees/:id', updateEmployee);

export default router;