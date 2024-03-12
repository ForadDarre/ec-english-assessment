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
    holidayApplied: boolean;
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

export interface AddStudentsCourseRequestDto {
    studentId: string;
    courseId: string;
    startDate: string;
    endDate: string;
}

export interface AddHolidayBreakRequestDto {
    studentCourseId: string;
    startDate: string;
    endDate: string;
}

export interface AddStudentResponseDto {
    id: string;
}

export interface AddStudentsCourseResponseDto {
    id: string;
}
