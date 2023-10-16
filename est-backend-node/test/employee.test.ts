import request from "supertest";
import mongoose from "mongoose";
import app from "../src/server";
import http from "http";
import Employee from "../src/models/Employee";

describe(`Employee API`, () => {
    const testPort = process.env.TEST_PORT || 3030;
    const url = `/api/v1/employees`;
    let server: http.Server;

    const employee1 = {
        firstName: "John",
        lastName: "Doe",
        emailAddress: "john.doe@example.com",
        dob: "1990-01-01",
        skills: [{
            skill: "Java",
            yearsExperience: "3",
            seniority: "Senior"
        }],
        contactNumber: "+1234567890",
        address: {
            streetAddress: "123 Main St",
            city: "Cityville",
            postalCode: "12345",
            country: "Countryland",
        },
    };

    const employee2 = {
        firstName: "Jane",
        lastName: "Smith",
        emailAddress: "jane.smith@example.com",
        dob: "1993-03-03",
        skills: [{
            skill: "Python",
            yearsExperience: "7",
            seniority: "Junior"
        }],
        contactNumber: "0987654321",
        address: {
            streetAddress: "21 Other St",
            city: "Townsville",
            postalCode: "12323",
            country: "Secretland",
        },
    };

    const employee3 = {
        firstName: "Alice",
        lastName: "Johnson",
        emailAddress: "alice.johnson@example.com",
        dob: "2000-20-02",
        contactNumber: "1234567890",
        address: {
            streetAddress: "90 Kent St",
            city: "Smallville",
            postalCode: "2468",
            country: "Superland",
        },
        skills: [{
            skill: "JavaScript",
            yearsExperience: "1",
            seniority: "Junior"
        }],
    };

    beforeAll(async () => {
        if (!mongoose.connection.readyState) {
            await mongoose.connect(`mongodb://localhost:27017/test-employee-skills-db`, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
        }
        server = app.listen(testPort, () => {
            console.log(`Test server listening on port ${testPort}`);
        });
    });

    afterAll(async () => {
        if (server) {
            server.close();
        }
        await mongoose.connection.close();
    });

    afterEach(async () => {
        await Employee.deleteMany({});
    });


    describe(`POST /api/v1/employees`, () => {
        it(`should create a new employee with status 201`, async () => {

            const response = await request(app).post(url).send(employee1);

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty(`_id`);
        });

    });

    describe(`GET /api/v1/employees`, () => {
        it(`should get all employees`, async () => {
            const response = await request(app).get(url);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
        });
    });

    describe(`GET /api/v1/employees/search`, () => {
        it(`should search employees by first name, last name, or skill`, async () => {
            await request(app).post(url).send(employee1);
            await request(app).post(url).send(employee2);
            await request(app).post(url).send(employee3);

            const response = await request(app).get(`${url}/?search=John`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(2); 
        });

        it(`should return an empty array due to no matching employees`, async () => {
            const response = await request(app).get(`${url}/?search=NonExistentName`);

            expect(response.status).toBe(200);
            expect(Array.isArray(response.body)).toBe(true);
            expect(response.body.length).toBe(0);
        });
    });

    describe(`DELETE /api/v1/employees/:id`, () => {
        it(`should delete an employee by ID`, async () => {

            const createResponse = await request(app).post(url).send(employee1);
            const employeeId = createResponse.body._id;
            const deleteResponse = await request(app).delete(`${url}/${employeeId}`);

            expect(deleteResponse.status).toBe(204);
        });

        it(`should return a 404 status if the employee ID does not exist`, async () => {
            const nonExistentEmployeeId = `non-existent-id`;
            const response = await request(app).delete(`${url}/${nonExistentEmployeeId}`);

            expect(response.status).toBe(404);
        });
    });
    

    describe(`PUT /api/v1/employees/:id`, () => {
        let employeeId: string;
        it(`should return status 200 after updating employee name`, async () => {

            const createResponse = await request(app).post(url).send(employee1);
            employeeId = createResponse.body._id;
            const updateResponse = await request(app).put(`${url}/${employeeId}`).send({
                firstName: "Dan",
                lastName: "Smith",
            });
            expect(updateResponse.status).toBe(200);
        });
    });
});
