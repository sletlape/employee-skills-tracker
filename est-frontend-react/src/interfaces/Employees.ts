export interface Employee {
    _id?: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    emailAddress: string;
    dob: string;
    address: Address;
    skills: Skill[];
}

export interface Skill {
    skill: string;
    yearsExperience: string;
    seniority: string;
}

export interface Address {
    streetAddress: string
    city: string
    postalCode: string
    country: string
}