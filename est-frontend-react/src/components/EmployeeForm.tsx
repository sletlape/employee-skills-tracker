import React, { useEffect, useState, useRef } from "react";
import { Employee, Skill } from '../interfaces/Employees';
// import { saveEmployee, updateEmployee } from "../services/employeeService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";

interface EmployeeFormProps {
    onClose: () => void;
    onSave: (employeeData: Employee) => void;
    onDelete: (employeeID: string) => void;
    employeeData?: Employee;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({ onClose, onSave, onDelete, employeeData }) => {
    const initialSkill: Skill = { skill: "", yearsExperience: "", seniority: "" };
    const formRef = useRef<HTMLDivElement>(null);

    const [formData, setFormData] = useState<Employee>({
        firstName: "",
        lastName: "",
        contactNumber: "",
        emailAddress: "",
        dob: "",
        streetAddress: "",
        city: "",
        postalCode: "",
        country: "",
        skills: [initialSkill],
    });

    useEffect(() => {
        if (employeeData) {
            setFormData(employeeData);
        } else {
            setFormData({
                firstName: "",
                lastName: "",
                contactNumber: "",
                emailAddress: "",
                dob: "",
                streetAddress: "",
                city: "",
                postalCode: "",
                country: "",
                skills: [initialSkill],
            });
        }
    }, [employeeData]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleAddSkill = () => {
        setFormData({
            ...formData,
            skills: [
                ...formData.skills,
                initialSkill,
            ],
        });
    };

    const handleSkillChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newSkills = [...formData.skills];
        newSkills[index][event.target.name as keyof Skill] = event.target.value;
        setFormData(prevState => ({
            ...prevState,
            skills: newSkills,
        }));
    };

    const handleRemoveSkill = (index: number) => {
        setFormData(prevState => ({
            ...prevState,
            skills: formData.skills.filter((_, i) => i !== index),
        }));
    };

    const handleSave = (event: React.FormEvent) => {
        event.preventDefault();
        onSave(formData);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleDelete = async () => {
        console.log("deleting:", employeeData)
        if (employeeData && employeeData._id) {
            onDelete(employeeData._id);
        }
    }

    return (
        <div className="employee-form" ref={formRef}>
            <form onSubmit={handleSave}>
                {/* Basic Info */}
                <h4 className="form-title">{employeeData ? "Edit Employee" : "Add Employee"}</h4>
                <h5 className="section-title">Basic Info</h5>
                <div className="usr-Names">
                    <label className="first-name">
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                    <label className="last-name">
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <label>
                    Contact Number:
                    <input
                        type="text"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Email Address:
                    <input
                        type="email"
                        name="emailAddress"
                        value={formData.emailAddress}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Date of Birth:
                    <input
                        type="date"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                {/* Address Info */}
                <h5 className="section-title">Address Info</h5>
                <label>
                    Street Address:
                    <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Postal Code:
                    <input
                        type="text"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        required
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                    />
                </label>

                {/* Skills */}
                <h5 className="section-title">Skills</h5>
                {formData.skills.map((skill, index) => (
                    <div className="skills-row" key={index}>
                        <label className="skills">
                            Skill:
                            <input
                                type="text"
                                name="skill"
                                value={skill.skill}
                                onChange={(event) => handleSkillChange(index, event)}
                                required
                            />
                        </label>
                        <label className="years">
                            Yrs Exp:
                            <select
                                name="yearsExperience"
                                value={skill.yearsExperience}
                                onChange={(event) => handleSkillChange(index, event)}
                                required
                            >
                                <option value="">Select...</option>
                                <option value="1-2">1-2</option>
                                <option value="3-4">3-4</option>
                                <option value="5+">5+</option>
                            </select>
                        </label>
                        <label className="seniority">
                            Seniority Rating:
                            <select
                                name="seniority"
                                value={skill.seniority}
                                onChange={(event) => handleSkillChange(index, event)}
                                required
                            >
                                <option value="">Select...</option>
                                <option value="junior">Beginner</option>
                                <option value="mid">Intermediate</option>
                                <option value="senior">Expert</option>
                            </select>
                        </label>
                        {index > 0 && (
                            <label className="bin" onClick={() => handleRemoveSkill(index)}>
                                Remove
                            </label>
                        )}
                    </div>
                ))}
                <button type="button" onClick={handleAddSkill}>
                    Add New Skill
                </button>

                {/* Save Button */}
                <div className="form-buttons">
                    {employeeData && (
                        <button type="button" onClick={handleDelete} className="deleteBtn">
                            Delete Employee
                        </button>
                    )}
                    <button type="submit" className="saveBtn">
                        <FontAwesomeIcon icon={faCirclePlus} />
                        Save Employee
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EmployeeForm;
