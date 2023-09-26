import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/server';

const apiUrl = `/api/v1/employees`;

describe('Employee API', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/employee-skills-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    describe('POST /api/employees', () => {
        it('should create a new employee', async () => {
            const newEmployee = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                dateOfBirth: "1990-01-01",
                skills: [],
                address: {
                    streetAddress: "123 Main St",
                    city: "Cityville",
                    postalCode: "12345",
                    country: "Countryland",
                },
                contactNumber: "+1234567890",
            };

            const response = await request(app).post(`${apiUrl}`).send(newEmployee);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Employee created successfully');
            expect(response.body.employee).toHaveProperty('_id');
        });

    });

    describe('GET /api/employees', () => {
        it('should get all employees', async () => {
            const response = await request(app).get(`${apiUrl}`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

    });

    describe('DELETE /api/employees/:id', () => {
        it('should delete an employee by ID', async () => {
            const newEmployee = {
                firstName: "John",
                lastName: "Doe",
            };
            const createResponse = await request(app).post(`${apiUrl}`).send(newEmployee);

            const deleteResponse = await request(app).delete(`${apiUrl}/${createResponse.body.employee._id}`);

            expect(deleteResponse.status).toBe(204);
        });

        it('should return a 404 status if the employee ID does not exist', async () => {
            const nonExistentEmployeeId = 'non-existent-id';
            const response = await request(app).delete(`${apiUrl}/${nonExistentEmployeeId}`);

            expect(response.status).toBe(404);
        });
    });

    describe('GET /api/employees/search', () => {
        it('should search employees by first name, last name, or skill', async () => {
            const employee1 = {
                firstName: "John",
                lastName: "Doe",
                skills: [{ skill: "Java" }],
            };
            const employee2 = {
                firstName: "Jane",
                lastName: "Smith",
                skills: [{ skill: "Python" }],
            };
            const employee3 = {
                firstName: "Alice",
                lastName: "Johnson",
                skills: [{ skill: "JavaScript" }],
            };
            await request(app).post(`${apiUrl}`).send(employee1);
            await request(app).post(`${apiUrl}`).send(employee2);
            await request(app).post(`${apiUrl}`).send(employee3);

            const response = await request(app).get(`${apiUrl}/search?search=John`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2); 
        });

        it('should return an empty array if there are no matching employees', async () => {
            const response = await request(app).get(`${apiUrl}/search?search=NonExistentName`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });
});
