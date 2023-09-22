import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { Employee } from "../interfaces/Employees";

interface EmployeeFormProps {
    onClose: () => void;
    onSave: (employee: Employee) => void;
    employeeData?: Employee | null;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    onClose,
    onSave,
    employeeData
}) => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        contactNumber: "",
        emailAddress: "",
        dob: "",
        streetAddress: "",
        city: "",
        postalCode: "",
        country: "",
        skills: [],
    });

    useEffect(() => {
        if (employeeData) {
            setFormData({ ...employeeData });
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
                skills: [],
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
                { skill: "", yearsExperience: "", seniority: "" },
            ],
        });
    };

    const handleSkillChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const newSkills = [...formData.skills];
        newSkills[index][event.target.name] = event.target.value;
        setFormData({
            ...formData,
            skills: newSkills,
        });
    };

    const handleSave = () => {
        onSave(formData);
    };

    return (
        <div className="employee-form">
            <h3>{employeeData ? "Edit Employee" : "Add Employee"}</h3>
            <form onSubmit={handleSave}>
                <div className="basic-info">
                    <h5 className="section-title">Basic Info</h5>
                    <div className="usr-Names">
                        <label>
                            First Name:
                            <input
                                type="text"
                                name="firstName"
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Last Name:
                            <input
                                type="text"
                                name="lastName"
                                onChange={handleInputChange}
                            />
                        </label>
                    </div>
                    <label>
                        Contact Number:
                        <input
                            type="text"
                            name="contactNumber"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Email Address:
                        <input
                            type="email"
                            name="emailAddress"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label>
                        Date of Birth:
                        <input
                            type="date"
                            name="dob"
                            onChange={handleInputChange}
                        />
                    </label>
                </div>

                <h5 className="section-title">Address Info</h5>
                <label>
                    Street Address:
                    <input
                        type="text"
                        name="streetAddress"
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Postal Code:
                    <input
                        type="text"
                        name="postalCode"
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        onChange={handleInputChange}
                    />
                </label>

                <h5 className="section-title">Skills</h5>
                {skills.map((skill, index) => (
                    <div className="skills-row" key={index}>
                        <label className="skills" >
                            Skill:
                            <input
                                type="text"
                                name="skill"
                                value={skill.skill}
                                onChange={(event) => handleSkillChange(index, event)}
                            />
                        </label>

                        <label className="years">
                            Yrs Exp:
                            <input
                                type="number"
                                name="yearsExperience"
                                value={skill.yearsExperience}
                                onChange={(event) => handleSkillChange(index, event)}
                            />
                        </label>

                        <label className="seniority">
                            Seniority Rating:
                            <select
                                name="seniority"
                                value={skill.seniority}
                                onChange={(event) => handleSkillChange(index, event)}
                            >
                                <option value="">Select...</option>
                                <option value="junior">Beginner</option>
                                <option value="mid">Intermediate</option>
                                <option value="senior">Expert</option>
                            </select>
                        </label>
                        <label className="bin">
                            <FontAwesomeIcon icon={faTrashCan} />
                        </label>
                        {/* Add functionality to delete skill */}
                    </div>
                ))}
                <button type="button" onClick={handleAddSkill}>
                    Add New Skill
                </button>

                {/* Add functionality to save employee */}
                <button type="submit">Save Employee</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
