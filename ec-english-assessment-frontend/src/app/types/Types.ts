export interface Student {
    id: string;
    name: string;
    surname: string;
    email: string;
    studentsCourses: StudentCourse[];
}

export interface Course {
    id: string;
    name: string;
}

export interface StudentCourse {
    id: string;
    course: Course;
    student?: Student;
    startDate: Date;
    endDate: Date;
    holidayApplied: boolean;
}
