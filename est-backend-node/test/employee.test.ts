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
});
