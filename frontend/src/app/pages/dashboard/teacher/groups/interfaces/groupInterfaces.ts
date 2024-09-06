export interface StudentInterface {
    studentID: number;
    studentFirstName: string;
    studentLastName: string;
}

export interface GroupInterface {
    teacherId: number;
    groupName: string;
    students: number[];
}