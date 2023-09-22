import express, { Request, Response } from "express";
import cors from 'cors';

const app = express();
app.use(cors());

interface Employee{
    firstName: string,
    lastName: string,
    contactNumber: string
};

const employees: Employee[] = [
    {
        firstName: "John",
        lastName: "Doe",
        contactNumber: "+271234567"
    },
    {
        firstName: "Peter",
        lastName: "Wheat",
        contactNumber: "+271234567"
    },
    {
        firstName: "Debbie",
        lastName: "Brown",
        contactNumber: "+271234567"
    },
    {
        firstName: "Jane",
        lastName: "Smith",
        contactNumber: "+271234567"
    },
];

app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'Welcome to the Employee Skills API.' });
});

app.get('/employees', (req: Request, res: Response) => {
    res.json(employees);
});


export default app;