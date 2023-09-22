export interface Employee {
    firstName: string,
    lastName: string,
    contactNumber: string,
    emailAddress: string,
    dob: string,
    streetAddress: string,
    city: string,
    postalCode: string,
    country: string,
    skills: Skill[],
}

interface Skill {
    skill: string;
    yearsExperience: number;
    seniority: string;
}