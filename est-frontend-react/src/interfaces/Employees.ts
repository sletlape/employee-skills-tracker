export interface Employee {
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress: string;
    dob: string;
    streetAddress: string;
    city: string;
    postalCode: string;
    country: string;
    skills: Skill[];
}

export interface Skill {
    skill: string;
    yearsExperience: string;
    seniority: string;
}
