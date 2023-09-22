import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EmployeeForm = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [dob, setDob] = useState("");
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [country, setCountry] = useState("");
    const [skills, setSkills] = useState([]);

    const handleAddSkill = () => {
        setSkills([...skills, { skill: "", yearsExperience: "", seniority: "" }]);
    };

    const handleSkillChange = (index, event) => {
        const newSkills = skills.map((skill, skillIndex) => {
            if (index !== skillIndex) return skill;
            return { ...skill, [event.target.name]: event.target.value };
        });

        setSkills(newSkills);
    };

    return (
        <form>
            <div className="basic-info">
                <h5 className="section-title">Basic Info</h5>
                <div className="usr-Names">
                    <label>
                        First Name:
                        <input
                            type="text"
                            name="firstName"
                            onChange={(event) => setFirstName(event.target.value)}
                        />
                    </label>
                    <label>
                        Last Name:
                        <input
                            type="text"
                            name="lastName"
                            onChange={(event) => setLastName(event.target.value)}
                        />
                    </label>
                </div>
                <label>
                    Contact Number:
                    <input
                        type="text"
                        name="contactNumber"
                        onChange={(event) => setContactNumber(event.target.value)}
                    />
                </label>
                <label>
                    Email Address:
                    <input
                        type="email"
                        name="emailAddress"
                        onChange={(event) => setEmailAddress(event.target.value)}
                    />
                </label>
                <label>
                    Date of Birth:
                    <input
                        type="date"
                        name="dob"
                        onChange={(event) => setDob(event.target.value)}
                    />
                </label>
            </div>

            <h5 className="section-title">Address Info</h5>
            <label>
                Street Address:
                <input
                    type="text"
                    name="streetAddress"
                    onChange={(event) => setStreetAddress(event.target.value)}
                />
            </label>
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    onChange={(event) => setCity(event.target.value)}
                />
            </label>
            <label>
                Postal Code:
                <input
                    type="text"
                    name="postalCode"
                    onChange={(event) => setPostalCode(event.target.value)}
                />
            </label>
            <label>
                Country:
                <input
                    type="text"
                    name="country"
                    onChange={(event) => setCountry(event.target.value)}
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
    );
};

export default EmployeeForm;
