import request from "supertest";
import server from "../src/server";

describe("Employee API", () => {

    describe("POST /employees", () => {
        it("creates a new employee", async () => {
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
});
