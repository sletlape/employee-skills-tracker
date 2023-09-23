import request from "supertest";
import server from "../src/server";
import EmployeeModel from "../src/models/Employee";

describe("Employee API", () => {

    describe("POST /employees", () => {
        it("shoule create a new employee", async () => {
            const testEmployee = {
                id: "OZ1936",
                firstName: "John",
                lastName: "Doe",
                contactNumber: "123-456-7890",
                emailAddress: "john.doe@example.com",
                dob: "1990-01-01",
                streetAddress: "123 a Sbct",
                city: "town",
                postalCode: "12345",
                country: "USA",
                skills: [
                    {
                        skill: "JavaScript",
                        yearsExperience: "5",
                        seniority: "Intermediate",
                    },
                    {
                        skill: "React",
                        yearsExperience: "3",
                        seniority: "Junior",
                    },
                ],
            };

            const response = await request(server)
                .post("/api/v1/employees")
                .send(testEmployee);

            expect(response.status).toBe(201);
            expect(response.body.id).toBe("OZ1936");
        });
    });

    describe("DELETE /employees/:id", () => {
        it("should delete an employee by ID", async () => {
            const newEmployee = {
                id: "OZ1936",
                firstName: "John",
                lastName: "Doe",
                contactNumber: "123-456-7890",
                emailAddress: "john.doe@example.com",
                dob: "1990-01-01",
                streetAddress: "123 Main St",
                city: "Cityville",
                postalCode: "12345",
                country: "USA",
                skills: [
                    {
                        skill: "JavaScript",
                        yearsExperience: "5",
                        seniority: "Intermediate",
                    },
                    {
                        skill: "React",
                        yearsExperience: "3",
                        seniority: "Junior",
                    },
                ],
            };

            await request(server)
                .post("/api/v1/employees")
                .send(newEmployee);

            const response = await request(server)
                .delete("/api/v1/employees/OZ1936");

            expect(response.status).toBe(204);
            const deletedEmployee = await EmployeeModel.findOne({ id: "OZ1936" });
            expect(deletedEmployee).toBeNull();
        });

        it("should return 404 if the employee does not exist", async () => {
            const response = await request(server)
                .delete("/api/v1/employees/nonexistent");

            expect(response.status).toBe(404);
            expect(response.body.message).toBe("Employee not found.");
        });
    });
});