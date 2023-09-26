import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/server';

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

            const response = await request(app).post('/api/employees').send(newEmployee);

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Employee created successfully');
            expect(response.body.employee).toHaveProperty('_id');
        });

    });

    describe('GET /api/employees', () => {
        it('should get all employees', async () => {
            const response = await request(app).get('/api/employees');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });

    });

    describe('DELETE /api/employees/:id', () => {
        it('should delete an employee by ID', async () => {
            // Create a new employee
            const newEmployee = {
                firstName: "John",
                lastName: "Doe",
                // Add other employee properties as needed
            };
            const createResponse = await request(app).post('/api/employees').send(newEmployee);

            // Delete the created employee by ID
            const deleteResponse = await request(app).delete(`/api/employees/${createResponse.body.employee._id}`);

            expect(deleteResponse.status).toBe(204);
        });

        it('should return a 404 status if the employee ID does not exist', async () => {
            const nonExistentEmployeeId = 'non-existent-id';
            const response = await request(app).delete(`/api/employees/${nonExistentEmployeeId}`);

            expect(response.status).toBe(404);
        });
    });

    describe('GET /api/employees/search', () => {
        it('should search employees by first name, last name, or skill', async () => {
            // Create employees with specific names and skills
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
            await request(app).post('/api/employees').send(employee1);
            await request(app).post('/api/employees').send(employee2);
            await request(app).post('/api/employees').send(employee3);

            // Search for employees with "John" in their name or "JavaScript" in their skills
            const response = await request(app).get('/api/employees/search?search=John');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2); // There should be 2 matching employees
        });

        it('should return an empty array if there are no matching employees', async () => {
            // Search for an employee with a non-existent name
            const response = await request(app).get('/api/employees/search?search=NonExistentName');

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0); // No matching employees
        });
    });
});
