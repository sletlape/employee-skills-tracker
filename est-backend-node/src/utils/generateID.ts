import Employee from "../models/Employee";

const generateRandomString = (length: number, chars: string): string => {
    let letters = "";

    for (let i = 0; i < length; i++){
        letters += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return letters;
}

const checkUnique =async (idString:string):Promise<boolean> => {
    return await Employee.findOne({ id: idString }) ? false : true;
}

export const generateEmployeeID = async (): Promise<string> => {
    let isUniqe: boolean = false;
    let employeeID = "";

    while (!isUniqe) {
        let letters = generateRandomString(2, "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        let numbers = generateRandomString(4, "1234567890");
        employeeID = letters + numbers;

        isUniqe = await checkUnique(employeeID);
        console.log(employeeID,": is it unique?", isUniqe);
    }

    return employeeID;
}