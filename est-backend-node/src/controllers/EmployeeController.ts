import { Request, Response } from "express";
import { validationResult } from "express-validator";
import EmployeeModel, { EmployeeDocument } from "../models/Employee";

export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const employees = await EmployeeModel.find();
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error getting employees:", error);
        res.status(500).json({ messge: "Internal server error." });
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const employeeData: EmployeeDocument = req.body;

        const createdEmployee = await EmployeeModel.create(employeeData);

        res.status(201).json(createdEmployee);
    } catch (error) {
        console.error("Error creating employee:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const employee = await EmployeeModel.findOne({ id });
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        await EmployeeModel.deleteOne({ id });
        res.status(204).end();
    } catch (error) {
        console.error("Error occurd while trying to deleet employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}