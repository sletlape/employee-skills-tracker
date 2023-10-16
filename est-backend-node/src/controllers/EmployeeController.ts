import { Request, Response } from "express";
import { validationResult } from "express-validator";
import EmployeeModel, { EmployeeDocument } from "../models/Employee";
import { generateEmployeeID } from "../utils/generateID";
import { FilterQuery } from "mongoose";

const searchEmployees = async (searchQuery: string) => {
    return {
        $or: [
            { firstName: { $regex: new RegExp(searchQuery.toString(), "i") } },
            { lastName: { $regex: new RegExp(searchQuery.toString(), "i") } },
            { emailAddress: { $regex: new RegExp(searchQuery.toString(), "i") } }
        ]
    }
}

const filterEmployees = async (skill: string, seniority: string, city: string): Promise<FilterQuery<EmployeeDocument>> => {
    const filterQuery: FilterQuery<EmployeeDocument> = {};

    if (skill) {
        filterQuery["skills.skill"] = { $regex: new RegExp(skill, "i") };
    }
    if (seniority) {
        filterQuery["skills.seniority"] = { $regex: new RegExp(seniority, "i") };
    }
    if (city) {
        filterQuery["city"] = { $regex: new RegExp(city, "i") };
    }

    return filterQuery;
};

export const getEmployees = async (req: Request, res: Response) => {
    try {
        // console.log("Search or filter:", req.query)
        const { search, skill, seniority, city } = req.query;
        let queryBy: any = {}

        if (search) {
            queryBy = await searchEmployees(search.toString());
        }

        if (skill !== undefined || seniority !== undefined || city !== undefined) {
            const filterBy = await filterEmployees(
                skill?.toString() || "",
                seniority?.toString() || "",
                city?.toString() || ""
            );
            queryBy = { ...queryBy, ...filterBy }
        }

        const employees = await EmployeeModel.find(queryBy);
        // console.log("Responding data:", employees)
        res.status(200).json(employees);
    } catch (error) {
        console.error("Error getting employees:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

export const createEmployee = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const employeeData: EmployeeDocument = req.body;
        employeeData._id = await generateEmployeeID();

        const createdEmployee = await EmployeeModel.create(employeeData);

        res.status(201).json(createdEmployee);
    } catch (error) {
        console.error("Error creating employee:", error);
        return res.status(500).json({ message: "Internal server error.", error });
    }
};

export const deleteEmployee = async (req: Request, res: Response) => {
    try {
        // console.log("Deleting:", req.params)
        const { id } = req.params;

        const employee = await EmployeeModel.findOne({ _id: id });
        // console.log("!!!", employee)
        if (!employee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        await EmployeeModel.deleteOne({ _id: id });
        res.status(204).end();
    } catch (error) {
        console.error("Error occurd while trying to delete employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateEmployee = async (req: Request, res: Response) => {
    try {
        const updatedEmployee = await EmployeeModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!updatedEmployee) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee updated successfully", employee: updatedEmployee })
    } catch (error) {
        console.error("Error occurd while trying to update employee:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}