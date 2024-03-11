export interface StudentDto {
    id: string;
    name: string;
    surname: string;
    email: string;
    studentsCourses: StudentCourseDto[];
}

export interface CourseDto {
    id: string;
    name: string;
}

export interface StudentCourseDto {
    id: string;
    courseId: string;
    studentId: string;
    startDate: string;
    endDate: string;
    course: CourseDto;
}

export interface GetAllStudentsDto {
    students: StudentDto[];
}

export interface GetAllCoursesDto {
    courses: CourseDto[];
}

export interface AddStudentRequestDto {
    name: string;
    surname: string;
    email: string;
}

export interface EditStudentRequestDto {
    id: string;
    name: string;
    surname: string;
    email: string;
}
