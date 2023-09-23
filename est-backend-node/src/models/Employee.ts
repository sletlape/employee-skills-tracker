import mongoose, { Document, Schema } from 'mongoose';

export interface Skill {
    skill: string;
    yearsExperience: string;
    seniority: string;
}

export interface EmployeeDocument extends Document {
    id: string;
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

const EmployeeSchema = new Schema<EmployeeDocument>({
    id: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    contactNumber: { type: String, required: true },
    emailAddress: { type: String, required: true },
    dob: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    skills: [
        {
            skill: { type: String, required: true },
            yearsExperience: { type: String, required: true },
            seniority: { type: String, required: true },
        },
    ],
});

const EmployeeModel = mongoose.model<EmployeeDocument>('Employee', EmployeeSchema);

export default EmployeeModel;
