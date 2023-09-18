Employee
|---------------------|------------------|----------|---------|---------|
|      Field          |       Type       | Required | Unique  | Indexed |
|---------------------|------------------|----------|---------|---------|
| _id                 | ObjectId         | Yes      | Yes     | Yes     |
| firstName           | String           | Yes      | No      | No      |
| lastName            | String           | Yes      | No      | No      |
| email               | String           | Yes      | No      | No      |
| dateOfBirth         | Date             | Yes      | No      | No      |
| skills              | Array of Objects | No       | No      | No      |
| address             | Object           | Yes      | No      | No      |
| contactNumber       | String           | Yes      | No      | No      |
|---------------------|------------------|----------|---------|---------|

Skill (inside skills array)
|---------------------|------------------|----------|---------|---------|
|      Field          |       Type       | Required | Unique  | Indexed |
|---------------------|------------------|----------|---------|---------|
| skill               | String           | Yes      | No      | No      |
| yearsOfExperience   | Number           | Yes      | No      | No      |
| seniorityRating     | Number           | Yes      | No      | No      |
|---------------------|------------------|----------|---------|---------|

Address
|---------------------|------------------|----------|---------|---------|
|      Field          |       Type       | Required | Unique  | Indexed |
|---------------------|------------------|----------|---------|---------|
| streetAddress       | String           | Yes      | No      | No      |
| city                | String           | Yes      |No       | No      |
| postalCode          |String            |Yes       |No       | No      |
| country             |String            |Yes       |No       | No      |
|---------------------|------------------|----------|---------|---------|
